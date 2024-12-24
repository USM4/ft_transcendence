import React, { createContext, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserDataContext } from "../../DashBoard/UserDataContext";

export const GameSocketContext = createContext();

export const GameSocketProvider = ({ children }) => {
    const wsRef = useRef(null);
    const { user } = useContext(UserDataContext);
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        // Only create socket if it doesn't exist and we're on the correct paths
        if (!wsRef.current && user && 
            (pathname === "/tournament/options/game/matchMaking" || 
            pathname === "/tournament/options/game/online")) {
                
            console.log("-----------------------------{ GameSocketProvider } ----------------------: ", user, pathname);
            // console.log("Creating new WebSocket connection");
            const socket = new WebSocket("ws://localhost:8000/ws/game/");
            
            socket.onopen = () => {
                console.log("WebSocket connection established for Game.");
            };

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

    return <GameSocketContext.Provider value={wsRef}>{children}</GameSocketContext.Provider>;
};