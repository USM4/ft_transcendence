import React, { createContext, useRef, useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../DashBoard/UserDataContext";
import player3Image from "../../../public/anonyme.png";
import toast from "react-hot-toast";

export const GameSocketContext = createContext();

export const GameSocketProvider = ({ children }) => {
    const wsRef = useRef(null);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);
    const { user } = useContext(UserDataContext);
    const location = useLocation();
    const pathname = location.pathname;
    const [isReady, setIsReady] = useState(false);
    const [message, setMessage] = useState(null);
    const { target, type, opponent, old_pathname } = location.state || {
    };
    const [dataPlayers, setDataPlayers] = useState({
        user1: {
            username: user?.username,
            avatar: user?.avatar,
        },
        user2: {
            username: "Opponent",
            avatar: player3Image,
        },
    });
    useEffect(() => {
        // Only create socket if it doesn't exist and we're on the correct paths
        // console.log("pathname outside", pathname);
        if (wsRef.current &&
            pathname !== "/tournament/options/game/matchMaking" &&
            pathname !== "/tournament/options/game/online") {
            // console.log("wsRef.current", wsRef.current);
            console.log("wsRef.current &&  pathname !== /tournament/options/game/matchMaking && pathname !== /tournament/options/game/online");
            wsRef.current.close();
            wsRef.current = null;
            setMessage(null);
        }
        if (!wsRef.current && user &&
            (pathname === "/tournament/options/game/matchMaking" ||
                pathname === "/tournament/options/game/online")) {
            let socket = null
            console.log("--------------------------", message);
            if ((message && message.type === "error")) {
                toast.error(message.message);
                setMessage(null);
            }
            else {

                const socket_var=import.meta.env.VITE_WSS_URL
                if (type && type === "game_invite")
                    socket = new WebSocket(`${socket_var}/ws/game/?type=invite&opponent=${opponent}`);
                else if (target)
                    socket = new WebSocket(`${socket_var}/ws/game/?type=invited&opponent=${target}`);
                else
                    socket = new WebSocket(`${socket_var}/ws/game/?type=random`);
                
                socket.onopen = () => {
                    console.log("WebSocket connection established for Game.");
                };
                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    setMessage(data)
                    if (data.type !== "game_state_update")
                        console.log("message context", data);
                    if (data.type === "match_ready")
                        setIsReady(true)
                    setDataPlayers(data)
                }

                socket.onclose = () => {
                    console.log("WebSocket connection closed for Game.");
                    // if (wsRef.current)
                    //   wsRef.current.close();
                    wsRef.current = null;
                };
                // socket.onmessage = (event) =>{
                //   const data = JSON.parse(event.data)
                // //   console.log("message context", data);
                // }
                socket.onerror = (error) => {
                    console.error("WebSocket error:", error);
                };

                wsRef.current = socket;
            }
        }

        if (old_pathname === "/tournament/options/game/matchMaking" && pathname === "/tournament/options/game/matchMaking") {
            console.log("send to the backend");
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                console.log('target', target);
                console.log('wsref', wsRef.current);
                wsRef.current.send(
                    JSON.stringify({
                        type: 'invited',
                        message: `${target}`,
                    })
                )
            }
        }
        return () => {
            // Only close if we're navigating away from game pages

            if (wsRef.current &&
                !pathname.includes("/tournament/options/game/")) {
                console.log("Closing WebSocket connection");
                console.log("in return of the useEffect");
                wsRef.current.close();
                wsRef.current = null;
                setMessage(null);
            }
        };
    }, [user, pathname, old_pathname]);
    useEffect(() => {
        if (isReady) {

            const navigateTimeout = setTimeout(() => {
                // ghaymchi l page online f 3 seconds ila kan ready
                if (dataPlayers) {
                    navigate("/tournament/options/game/online", { state: { players: dataPlayers } });
                }
            }, 3000);

            // Cleanup intervals and timeouts
            return () => {
                clearTimeout(navigateTimeout);
            };
        }
    }, [isReady]);

    return <GameSocketContext.Provider value={{ wsRef: wsRef, message: message }}>{children}</GameSocketContext.Provider>;
};