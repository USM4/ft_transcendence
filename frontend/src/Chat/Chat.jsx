import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Chat_sidebar from './Chat-sidebar.jsx';
import SocketContext from '../Dashboard/SocketContext.jsx';

export const ChatSocketContext = createContext()
export default function Chat() {
  const [chatsocket, setChatsocket] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const establishConnection = () => {
      const socket = new WebSocket(`ws://localhost:8000/ws/chat/`);
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