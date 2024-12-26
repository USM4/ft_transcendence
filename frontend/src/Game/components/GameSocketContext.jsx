import React, { createContext, useRef, useEffect, useContext ,useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { UserDataContext } from "../../DashBoard/UserDataContext";
import player3Image from "../../../public/anonyme.png";

export const GameSocketContext = createContext();

export const GameSocketProvider = ({ children }) => {
    const wsRef = useRef(null);
    const { user } = useContext(UserDataContext);
    const location = useLocation();
    const pathname = location.pathname;
    const [isReady, setIsReady] = useState(false);
    const [message, setMessage] = useState(null);
    const { target, type, opponent} = location.state || {
    };
    const [dataPlayers, setDataPlayers] = useState({
      user1: {
          username: user?.username,
          avatar: user?.avatar,
      },
      user2: {
          username: "Opponent",
          avatar: player3Image,
      },
  });
  const navigate = useNavigate();

    useEffect(() => {
        // Only create socket if it doesn't exist and we're on the correct paths
        console.log("pathname outside", pathname);
        if (wsRef.current && 
            pathname !== "/tournament/options/game/matchMaking" &&
            pathname !== "/tournament/options/game/online") {
            console.log("wsRef.current", wsRef.current);
            wsRef.current.close();
            wsRef.current = null;
            setMessage(null);
        }
        if (!wsRef.current && user && 
            (pathname === "/tournament/options/game/matchMaking" || 
            pathname === "/tournament/options/game/online")) {
                
            let socket = null 
            if (type && type === "game_invite")
                socket = new WebSocket(`ws://localhost:8000/ws/game/?type=invite&opponent=${opponent}`);
            else if (target)
                socket = new WebSocket(`ws://localhost:8000/ws/game/?type=invited&opponent=${target}`);
            else
                socket = new WebSocket("ws://localhost:8000/ws/game/?type=random");
            
            socket.onopen = () => {
                console.log("WebSocket connection established for Game.");
            };

            socket.onclose = () => {
                console.log("WebSocket connection closed for Game.");
                // if (wsRef.current)
                //   wsRef.current.close();
                wsRef.current = null;
            };
            socket.onmessage = (event) =>{
              const data = JSON.parse(event.data)
              setMessage(data)
            }
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            wsRef.current = socket;
        }

        return () => {
            // Only close if we're navigating away from game pages

            if (wsRef.current && 
                !pathname.includes("/tournament/options/game/")) {
                console.log("Closing WebSocket connection");
                wsRef.current.close();
                wsRef.current = null;
                setMessage(null);
            }
        };
    }, [user, pathname]);
    useEffect(() => {
      if (isReady) {

          const navigateTimeout = setTimeout(() => {
              // ghaymchi l page online f 3 seconds ila kan ready
              if (dataPlayers) {
                  navigate("/tournament/options/game/online", { state: { players: dataPlayers } });
              }
          }, 3000);

          // Cleanup intervals and timeouts
          return () => {
              clearTimeout(navigateTimeout);
          };
      }
  }, [isReady]);

    return <GameSocketContext.Provider value={{wsRef: wsRef, message: message}}>{children}</GameSocketContext.Provider>;
};