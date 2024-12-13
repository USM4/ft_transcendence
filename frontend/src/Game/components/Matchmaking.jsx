import React,{ useEffect} from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import RemotePong from "./RemotePong";
import { use } from "react";


export const MatchmakingContext = createContext()
export default function Matchmaking() {
    const [gamesocket, setGameSocket] = useState(null);
      const location = useLocation();
      const pathname = location.pathname;

    useEffect(() => {
        const establishConnection = () => {
          const socket = new WebSocket(`ws://localhost:8000/ws/game/`);
          socket.onopen = () => {
            setGameSocket(socket);
            console.log("Game connection established.")
          };
          socket.onclose = () => {
            console.log("Game connection closed.")
          };
        }
        if (pathname !== '/signin' && pathname !== '/' && pathname !== '/signup' && pathname !== '/features' && pathname !== '/howtoplay')
          establishConnection();
      }, [])

      return (
        <>
          {gamesocket &&
            (<MatchmakingContext.Provider value={gamesocket}>
              <RemotePong ></RemotePong>
            </MatchmakingContext.Provider>)
          }
        </>
      );
}