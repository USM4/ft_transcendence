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
        if (wsRef.current &&
            pathname !== "/tournament/options/game/matchMaking" &&
            pathname !== "/tournament/options/game/online") {
            wsRef.current.close();
            wsRef.current = null;
            setMessage(null);
        }
        if (!wsRef.current && user &&
            (pathname === "/tournament/options/game/matchMaking" ||
                pathname === "/tournament/options/game/online")) {
            let socket = null
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
                    wsRef.current = null;
                };

                socket.onerror = (error) => {
                    console.error("WebSocket error:", error);
                };

                wsRef.current = socket;
            }
        }

        if (old_pathname === "/tournament/options/game/matchMaking" && pathname === "/tournament/options/game/matchMaking") {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(
                    JSON.stringify({
                        type: 'invited',
                        message: `${target}`,
                    })
                )
            }
        }
        return () => {

            if (wsRef.current &&
                !pathname.includes("/tournament/options/game/")) {
                wsRef.current.close();
                wsRef.current = null;
                setMessage(null);
            }
        };
    }, [user, pathname, old_pathname]);
    useEffect(() => {
        if (isReady) {

            const navigateTimeout = setTimeout(() => {
                if (dataPlayers) {
                    navigate("/tournament/options/game/online", { state: { players: dataPlayers } });
                }
            }, 3000);

            return () => {
                clearTimeout(navigateTimeout);
            };
        }
    }, [isReady]);

    return <GameSocketContext.Provider value={{ wsRef: wsRef, message: message }}>{children}</GameSocketContext.Provider>;
};