import React, { useState,createContext, useRef, useEffect, useContext } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { UserDataContext } from "../../DashBoard/UserDataContext";
import player3Image from "../../../public/anonyme.png";

export const GameSocketContext = createContext();

export const GameSocketProvider = ({ children }) => {
    const wsRef = useRef(null);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);
    const { user } = useContext(UserDataContext);
    const location = useLocation();
    const pathname = location.pathname;
    const [isReady, setIsReady] = useState(false);
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

    const target = location.state?.target || 'default_value';


    useEffect(() => {
        // Only create socket if it doesn't exist and we're on the correct paths
        if (!wsRef.current && user && 
            (pathname === "/tournament/options/game/matchMaking" || 
            pathname === "/tournament/options/game/online")) {
                
            const socket = new WebSocket("ws://localhost:8000/ws/game/");
            
            socket.onopen = () => {
                console.log("WebSocket connection established for Game.");
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                console.log("data from onmessage",  data);
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

        return () => {
            // Only close if we're navigating away from game pages
            if (wsRef.current && 
                !pathname.includes("/tournament/options/game/")) {
                console.log("Closing WebSocket connection");
                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, [user, pathname]);
    useEffect(() => {
        if (isReady) {
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => prev - 1); // Decrementi l countdown
            }, 1000);

            const navigateTimeout = setTimeout(() => {
                // ghaymchi l page online f 3 seconds ila kan ready
                if (dataPlayers) {
                    navigate("/tournament/options/game/online", { state: { players: dataPlayers } });
                }
            }, 3000);

            // Cleanup intervals and timeouts
            return () => {
                clearInterval(countdownInterval);
                clearTimeout(navigateTimeout);
            };
        }
    }, [isReady]);

    return <GameSocketContext.Provider value={wsRef}>{children}</GameSocketContext.Provider>;
};