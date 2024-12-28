import React from "react";
import { useState , useRef,useEffect } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";
import player3Image from "../../../public/anonyme.png";
import { useContext} from "react";
import { GameSocketContext } from "./GameSocketContext.jsx";
import { UserDataContext } from "../../DashBoard/UserDataContext.jsx";
import toast from "react-hot-toast";

const Matchmaking = () => {
    
    const navigate = useNavigate();

    const [isReady, setIsReady] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const { user } = useContext(UserDataContext);
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
    const [player1, setPlayer1] = useState({
        username: "player1",
        avatar: player1Image,
    });
    const [player2, setPlayer2] = useState({
        username: "player2",
        avatar: player2Image,
    });
    const {wsRef, message} = useContext(GameSocketContext);

useEffect(() => {
    if (wsRef.current && message) {
        console.log("in matchMaking", message);
            const data = message;
            switch(data.type) {
                case "connected":
                    break;
                    
                case "match_ready":
                    setDataPlayers(data);
                    setIsReady(true);
                    break;
                    
                case "player_disconnected":
                    toast.error("player_disconnected play again")
                    navigate('/tournament/options/game')
                case "waiting_for_players":
                    setIsReady(false);
                    break;

            }
    }
}, [wsRef, user?.username, message]);
    
    useEffect(() => {
        if (isReady) {
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => prev - 1); // Decrementi l countdown
            }, 1000);

            const navigateTimeout = setTimeout(() => {
                // ghaymchi l page online f 3 seconds ila kan ready
                if (dataPlayers) {
                    navigate("/tournament/options/game/online", { state: { players: dataPlayers } });
                }
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
                        <h2> {dataPlayers.user1.username === user?.username ? dataPlayers.user2.username : dataPlayers.user1.username} </h2>
                    </div>
                    <div className="current-player-img">
                        <img src={dataPlayers.user1.avatar === user?.avatar ? dataPlayers.user2.avatar : dataPlayers.user1.avatar } alt="Player 2" />
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
