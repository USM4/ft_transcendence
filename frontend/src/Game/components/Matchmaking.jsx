import React, { useEffect, createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserDataContext } from "../../DashBoard/UserDataContext.jsx";
import RemotePong from "./RemotePong.jsx";

export const MatchmakingContext = createContext();

function MatchMakingContextProvider({ children }) {
  // const [socketGame, setSocketGame] = useState(null);
  // const { user } = useContext(UserDataContext);
  // const location = useLocation();
  // const pathname = location.pathname;

  // useEffect(() => {
  //   const establishConnection = () => {
  //     const socket = new WebSocket(`ws://localhost:8000/ws/game/`);
  //     socket.onopen = () => {
  //       console.log("{{{{{{   Game connection established.  }}}}}}}}}}");
  //       setSocketGame(socket);
  //     };
  //     socket.onclose = () => {
  //       console.log("Game connection closed.");
  //       setSocketGame(null);
  //     };
  //   };

  //   // Establish connection if conditions are met
  //   if (
  //     !socketGame &&
  //     user &&
  //     !["/signin", "/", "/signup", "/features", "/howtoplay"].includes(pathname)
  //   ) {
  //     establishConnection();
  //   }

  //   // Close connection if conditions are not met
  //   if (
  //     socketGame &&
  //     (!user ||
  //       ["/signin", "/", "/signup", "/features", "/howtoplay"].includes(
  //         pathname
  //       ))
  //   ) {
  //     socketGame.close();
  //     setSocketGame(null);
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     if (socketGame) {
  //       socketGame.close();
  //       setSocketGame(null);
  //     }
  //   };
  // }, [pathname, user, socketGame]);

  // return (
  //   <MatchMakingContext.Provider value={socketGame}>
  //     <RemotePong>{children}</RemotePong>
  //   </MatchMakingContext.Provider>
  // );
}

export default MatchmakingContext;
