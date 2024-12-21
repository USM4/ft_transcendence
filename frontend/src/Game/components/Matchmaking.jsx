import React from "react";
import { useState ,useEffect } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";
import player3Image from "../../../public/anonyme.png";
import { useContext } from "react";
import { GameSocketContext } from "./GameSocketContext.jsx";
import { UserDataContext } from "../../DashBoard/UserDataContext.jsx";

const Matchmaking = () => {
    
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [countdown, setCountdown] = useState(3);
    // const [, setPlayerAvatar] = useState('');
    // const [socket, setSocket] = useState(null);
    const { user } = useContext(UserDataContext);
    // const [playerName, setPlayerName] = useState("player");
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
  
    let ws = null;
    useEffect(() => {
    
        const establishConnection = () => {
            ws = new WebSocket("ws://localhost:8000/ws/game/");
            
            ws.onopen = () => {
                console.log("WebSocket connection established for matchmaking.");
                // setSocket(ws);
            };
    
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("WebSocket message received:", data);
    
                if (data.type === "connected") {
                    console.log("-----------------------< ",data.data);
                }
                else if (data.type === "match_ready") {
                    console.log("----------match ready -------------- ",data);
                    if (data.user1.username === user.username)
                        setPlayer2(data.user2);
                    else
                        setPlayer2(data.user1);
                    setIsReady(true);
                 }
                else if (data.type === "waiting_for_players") {
                    console.log(data.message);
                    setIsReady(false);
                }
                //     console.log("Match is ready!");
                // } else if (data.type === "game_start") {
                //     console.log("Game is starting!");
                //     setPlayer(data.player);
                //     setPlayerAvatar(data.avatar || player3Image);
                //     setIsReady(true);
                // } else if (data.type === "game_over") {
                //     console.log("Game over:", data.message);
                // }
            };
    
            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                // setSocket(null);
            };
    
            ws.onclose = () => {
                console.warn("WebSocket connection closed.");
                // setSocket(null);
            };
        };
    
        if (!ws && user && pathname !== "/signin" && pathname !== "/signup") {
            console.log("ws", ws, "user", user, "pathname", pathname);
            establishConnection();
        }
    
        // return () => {
        //     if (ws) {
        //         ws.close();
        //         setSocket(null);
        //     }
        // };
    }, [pathname, user, ws]);
    
    useEffect(() => {
        if (isReady) {
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => prev - 1); // Decrementi l countdown
            }, 1000);

            const navigateTimeout = setTimeout(() => {
                // ghaymchi l page online f 3 seconds ila kan ready
                navigate("/tournament/options/game/online");
            }, 3000);

            // Cleanup intervals and timeouts
            return () => {
                clearInterval(countdownInterval);
                clearTimeout(navigateTimeout);
            };
        }
    }, [isReady, navigate]);

//     useEffect(() => {
//         if (socket) {
//             console.log("--------------{ socket }--------------", socket);
//         //     socket.onmessage = (event) => {
//         //         const data = JSON.parse(event.data);
//         //         // console.log("socket from backend", data);
                
//         //         if (data.type === "connected") {
//         //             console.log(data.message);
//         //         }
//         //         if (data.type === "match_ready") {
                  
//         //         }
//         //         if  (data.type ==='game_start'){
//         //             // console.log( "$$$$$$$$$$$$$$$$ " , data.avatar , " $$$$$$$$$$$$$$$$$$$$$$$$$$$")
//         //             setPlayer(data.player);
//         //             setPlayerAvatar(data.avatar || player3Image);
//         //             // handlePlayerCredentials(data.player, data.avatar);
//         //             // console.log(`DATA KAMLA ------------> ${data}`);
//         //             setIsReady(true);
//         //         }
//         //         else if (data.type === 'waiting_for_players')
//         //         {
//         //             setIsReady(false);
//         //             // console.log(data.message);
//         //         }
//         //         else if (data.type === 'game_over')
//         //         {
                    
//         //             setGameState("Waiting");
                    
//         //         }
//         //     socket.onerror = (error) => {
//         //         console.error("WebSocket error:", error);
//         //     };
//         //     socket.onclose = () => {
//         //         console.warn("WebSocket connection closed.");
//         //     };
//         // }
//     }
// }
// , [socket]);

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
                        <h2> {player2.username} </h2>
                    </div>
                    <div className="current-player-img">
                        <img src={player2.avatar || player3Image} alt="Player 2" />
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
