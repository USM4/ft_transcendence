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
      console.log("Establishing WebSocket connection... socketa dyal game");
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
        console.log("Game Socket  connection closed. 9");
      };
    };
    // Only establish the WebSocket connection if user is logged in
    // and the pathname is not one of the ignored paths
    console.log("pathname", pathname, "user", user, "socket", socket);
    if (
      pathname !== "/signin" &&
      pathname !== "/" &&
      pathname !== "/signup" &&
      pathname !== "/features" &&
      pathname !== "/howtoplay" &&
      pathname !== "/dashboard/*" &&
      pathname !== "/tournament/options" &&
      pathname !== "/tournament/options/game" &&
      pathname !== "/tournament/options/game/local" &&
      pathname !== "/tournament/options/game/bot" &&
      user && // Only if user is present
      !socket // Only open a new connection if there's no existing one
    ) {
      console.log("open =======> ", user, pathname);
        establishConnection();
    }

    // If the pathname matches an ignored path or user is not logged in, close the WebSocket
    if (
      (pathname === "/signin" ||
      pathname === "/" ||
      pathname === "/signup" ||
      pathname === "/features" ||
      pathname === "/howtoplay" ||
      pathname === "/dashboard/*" ||
      pathname === "/tournament/options" ||
      pathname === "/tournament/options/game" ||
      pathname === "/tournament/options/game/local" ||
      pathname === "/tournament/options/game/bot" ||
      !user) &&
      socket
    ) {
      console.log("closing =======> ", user.username, pathname);
        socket.close(); // Close WebSocket if it's open
        console.log("WebSocket connection closed 3.");
        setSocket(null); // Clear socket state
    }


    // return () => {
    //   console.log("CLEANUP");
    // //   if (socket) {
    // //     socket.close(); // Ensure to close the socket when the component unmounts or on path changes
    // //     console.log("WebSocket connection closed 4.");
    // //     setSocket(null); // Cleanup the socket state
    // //   }
    // };
  
  }, [pathname, user, socket]); // Dependencies: pathname, user, and socket state
  return (
    <GameSocketContext.Provider value={{ socket }}>
      {children}
    </GameSocketContext.Provider>
  );
};
