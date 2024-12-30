import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Chat_sidebar from './Chat-sidebar.jsx';

export const ChatSocketContext = createContext()
export default function Chat() {
  const [chatsocket, setChatsocket] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const establishConnection = () => {
      const socket_var=import.meta.env.VITE_WSS_URL
      const socket = new WebSocket(`${socket_var}/ws/chat/`);
      socket.onopen = () => {
        setChatsocket(socket);
        console.log("Chat connection established.")
      };
      socket.onclose = () => {
        console.log("Chat connection closed.")
      };
    }
    if (pathname !== '/signin' && pathname !== '/' && pathname !== '/signup' && pathname !== '/features' && pathname !== '/howtoplay')
      establishConnection();
  }, [])

  return (
    <>
      {chatsocket &&
        (<ChatSocketContext.Provider value={chatsocket}>
          <Chat_sidebar ></Chat_sidebar>
        </ChatSocketContext.Provider>)
      }
    </>
  );
}