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
        // Function to establish a WebSocket connection
        // console.log("SocketContextProvider", pathname, user, socket);

        const establishConnection = () => {
            console.log("Establishing WebSocket connection... socketa dyal online status");
            const ws = new WebSocket('ws://localhost:8000/ws/online_status/');

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

        // Only establish the WebSocket connection if user is logged in
        // and the pathname is not one of the ignored paths
        if (
            pathname !== '/signin' &&
            pathname !== '/' &&
            pathname !== '/signup' &&
            pathname !== '/features' &&
            pathname !== '/howtoplay' &&
            user && // Only if user is present
            !socket // Only open a new connection if there's no existing one
        ) {
            establishConnection();
        }

        // If the pathname matches an ignored path or user is not logged in, close the WebSocket
        if (
            pathname === '/signin' ||
            pathname === '/' ||
            pathname === '/signup' ||
            pathname === '/features' ||
            pathname === '/howtoplay' ||
            !user
        ) {
            if (socket) {
                socket.close();  // Close WebSocket if it's open
                console.log("WebSocket connection closed 1.");
                setSocket(null);  // Clear socket state
            }
        }

        // Cleanup: Close WebSocket when component unmounts or when necessary 

        // return () => {
        //     if (socket) {
        //         socket.close(); // Ensure to close the socket when the component unmounts or on path changes
        //         console.log("WebSocket connection closed 2.");
        //         setSocket(null); // Cleanup the socket state
        //     }
        // };

    }, [pathname, user, socket]); // Dependencies: pathname, user, and socket state

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;
