import React from "react";
import { useContext, createContext, useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { UserDataContext } from "./UserDataContext.jsx";

export const SocketContext = createContext();
function SocketContextProvider ({ children }) {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(UserDataContext);
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        const establishConnection =  () => {
        console.log("Establishing WebSocket connection...");
        const ws = new WebSocket('ws://localhost:8000/ws/online_status/');

        ws.onopen = () => {
            console.log("WebSocket connection establishe");
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
    if(pathname !== '/signin' && pathname !== '/' && pathname !== '/signup' && pathname !== '/features' && pathname !== '/howtoplay' && !socket && user){
        establishConnection();
    }
    else if(socket !== null){
        socket.close();
        setSocket(null);
    }
    }, [pathname, user]);
    return(
        <SocketContext.Provider value={{ socket}}>
        {children}
      </SocketContext.Provider>
    );    
};
export default SocketContextProvider;