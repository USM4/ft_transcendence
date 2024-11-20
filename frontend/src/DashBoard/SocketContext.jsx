import React from "react";
import { useContext, createContext, useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import useWebSocket from 'react-use-websocket';

const SocketContext = createContext();
export default function SocketContextProvider ({ children }) {
    const location = useLocation();
    // const pathname = location.pathname;

    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8000/ws/notifications/', {
        onOpen: () => console.log('opened'),
        onClose: () => console.log('closed'),
        onMessage: (event) => console.log('message:', event.data),
        onError: (event) => console.log('error:', event),
        shouldReconnect: (closeEvent) => true,

    });
    // useEffect(() => {

    // if(pathname !== '/signin' && pathname !== '/' && pathname !== '/signup' && pathname !== '/features' && pathname !== '/howtoplay')
    //     establishConnection();
    // }, [pathname]);

   
    return(
        <SocketContext.Provider value={{sendMessage, lastMessage, readyState}}>
            {children}
        </SocketContext.Provider>
    );    
};

export const useWebSocketContext = () => {
    return useContext(SocketContext);
};