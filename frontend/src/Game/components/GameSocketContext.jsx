import React, { useEffect, createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserDataContext } from "../../DashBoard/UserDataContext.jsx";
import PongGame from "./PongGame.jsx";
import RemotePong from "./RemotePong.jsx";

export const GameSocketContext = createContext();

export const GameSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(UserDataContext);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Function to establish a WebSocket connection
    const establishConnection = () => {
      console.log("Establishing WebSocket connection...");
      const ws = new WebSocket("ws://localhost:8000/ws/game/");

      ws.onopen = () => {
        console.log(
          "---------{ Game Socket  connection established }--------------"
        );
        setSocket(ws);
      };

      ws.onerror = (error) => {
        setSocket(null);
        console.error("Game Socket  connection error:", error);
      };

      ws.onclose = () => {
        setSocket(null);
        console.log("Game Socket  connection closed.");
      };
    };
    // Only establish the WebSocket connection if user is logged in
    // and the pathname is not one of the ignored paths
    if (
      pathname !== "/signin" &&
      pathname !== "/" &&
      pathname !== "/signup" &&
      pathname !== "/features" &&
      pathname !== "/howtoplay" &&
      pathname !== "/dashboard/*" &&
      pathname !== "/tournament/options" &&
      pathname !== "/tournament/options/game/local" &&
      pathname !== "/tournament/options/game/bot" &&
      user && // Only if user is present
      !socket // Only open a new connection if there's no existing one
    ) {
      establishConnection();
    }

    // If the pathname matches an ignored path or user is not logged in, close the WebSocket
    if (
      pathname === "/signin" ||
      pathname === "/" ||
      pathname === "/signup" ||
      pathname === "/features" ||
      pathname === "/howtoplay" ||
      pathname === "/dashboard/*" ||
      pathname === "/tournament/options/" ||
      pathname === "/tournament/options/game/local" ||
      pathname === "/tournament/options/game/bot" ||
      !user
    ) {
      if (socket) {
        socket.close(); // Close WebSocket if it's open
        setSocket(null); // Clear socket state
      }
    }

 
    return () => {
      if (socket) {
        socket.close(); // Ensure to close the socket when the component unmounts or on path changes
        setSocket(null); // Cleanup the socket state
      }
    };
  }, [pathname, user, socket]); // Dependencies: pathname, user, and socket state
  return (
    <GameSocketContext.Provider value={{ socket }}>
      {children}
    </GameSocketContext.Provider>
  );
};
