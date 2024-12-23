import React from "react";
import { useState , useRef,useEffect } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";
import player3Image from "../../../public/anonyme.png";
import { useContext} from "react";
import { GameSocketContext } from "./GameSocketContext.jsx";
import { UserDataContext } from "../../DashBoard/UserDataContext.jsx";


const Matchmaking = () => {
    
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const { user } = useContext(UserDataContext);
    const [dataOpponent, setDataOpponent] = useState({});
    const [player1, setPlayer1] = useState({
        username: "player1",
        avatar: player1Image,
    });
    const [player2, setPlayer2] = useState({
        username: "player2",
        avatar: player2Image,
    });
    const location = useLocation();
    const pathname = location.pathname;

    const gameSocketRef = useContext(GameSocketContext);

    const isReadyRef = useRef(isReady);
    const dataOpponentRef = useRef(dataOpponent);

    useEffect(() => {
        isReadyRef.current = isReady;
        dataOpponentRef.current = dataOpponent;
    }, [isReady, dataOpponent]);

useEffect(() => {
    if (gameSocketRef.current) {
        const socket = gameSocketRef.current;
        // console.log("Setting up Matchmaking message handler");
        
        const handleMatchmakingMessage = (event) => {
            const data = JSON.parse(event.data);
            // console.log("Matchmaking received message:", data);

            switch(data.type) {
                case "connected":
                    // console.log("Player connected:", data.data);
                    break;
                    
                case "match_ready":
                    // console.log("Match ready:", data);
                    if (data.user1.username === user.username) {
                        setDataOpponent(data.user2);
                    } else {
                        setDataOpponent(data.user1);
                    }
                    setIsReady(true);
                    break;
                    
                case "waiting_for_players":
                    // console.log("Waiting for players:", data.message);
                    setIsReady(false);
                    break;

            }
        };

        socket.addEventListener('message', handleMatchmakingMessage);
        
        return () => {
            // console.log("Cleaning up Matchmaking message handler");
            socket.removeEventListener('message', handleMatchmakingMessage);
        };
    }
}, [gameSocketRef, user?.username]);
    
    useEffect(() => {
        if (isReady) {
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => prev - 1); // Decrementi l countdown
            }, 1000);

            const navigateTimeout = setTimeout(() => {
                // ghaymchi l page online f 3 seconds ila kan ready
                console.log("Navigating to online game...",  "player2", player2);
                if (dataOpponent)
                    navigate("/tournament/options/game/online", { state: { player: dataOpponent } });
                
            }, 3000);

            // Cleanup intervals and timeouts
            return () => {
                clearInterval(countdownInterval);
                clearTimeout(navigateTimeout);
            };
        }
    }, [isReady, navigate]);


    return (
        <div className="match-making-global-component">
            <div className="match-making-title">Looking for a player...</div>
            <div className="match-making-container">
                 <div className="current-player-card">
                    <div className="current-player-name">
                        <h2>{user?.username}</h2>
                    </div>
                    <div className="current-player-img">
                        <img src={user?.avatar || player2Image} alt="Player 1" />
                        <div className="current-player-status status-ready">Ready</div>
                    </div>
                </div>
                
                <div className="loading-dots">
                    {isReady && countdown > 0 ? (
                        <div className="countdown">{countdown}</div>
                    ) : (
                        <div>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    )}
                </div>
                
                <div className="current-player-card">
                    <div className="current-player-name">
                        <h2> {dataOpponent.username || "Opponent"} </h2>
                    </div>
                    <div className="current-player-img">
                        <img src={dataOpponent.avatar || player3Image} alt="Player 2" />
                        {isReady ? <div className="current-player-status status-ready">Ready</div> :
                            <div className="current-player-status status-not-ready">Not yet</div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Matchmaking;
