import React from "react";
import { useContext, createContext, useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";

export const SocketContext = createContext();
function SocketContextProvider ({ children }) {
    const [socket, setSocket] = useState(null)
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        const establishConnection =  () => {
        const ws = new WebSocket('ws://localhost:8000/ws/notifications/');

        ws.onopen = () => {
            console.log("WebSocket connection established.");
            setSocket(ws);
        };

        ws.onerror = (error) => {
            setSocket(null);
            console.error("WebSocket error:", error);
        };
    
        ws.onclose = () => {
            setSocket(null);
            console.log("WebSocket connection closed.");
        };
    }
    if(pathname !== '/signin' && pathname !== '/' && pathname !== '/signup' && pathname !== '/features' && pathname !== '/howtoplay')
        establishConnection();
    }, []);
    return(
        <SocketContext.Provider value={{ socket}}>
        {children}
      </SocketContext.Provider>
    );    
};
export default SocketContextProvider;