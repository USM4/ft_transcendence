import React, { useContext, createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserDataContext } from './UserDataContext.jsx';

export const SocketContext = createContext();

function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(UserDataContext);
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {

        const establishConnection = () => {
            console.log("Establishing WebSocket connection... socketa dyal online status");
            const socket_var=import.meta.env.VITE_WSS_URL
            const ws = new WebSocket(`${socket_var}/ws/online_status/`);

            ws.onopen = () => {
                console.log("---------{ WebSocket connection established }--------------");
                setSocket(ws);
            };

            ws.onerror = (error) => {
                setSocket(null);
                console.error("WebSocket error:", error);
            };

            ws.onclose = () => {
                setSocket(null);
                console.log("WebSocket connection closed.---------------------------------------");
            };
        };

        if (
            pathname !== '/signin' &&
            pathname !== '/' &&
            pathname !== '/signup' &&
            pathname !== '/about' &&
            pathname !== '/howtoplay' &&
            user &&
            !socket
        ) {
            establishConnection();
        }

        if (
            pathname === '/signin' ||
            pathname === '/' ||
            pathname === '/signup' ||
            pathname === '/about' ||
            pathname === '/howtoplay' ||
            !user
        ) {
            if (socket) {
                socket.close();  
                console.log("WebSocket connection closed 1.");
                setSocket(null);  
            }
        }

    }, [pathname, user, socket]); 

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;
