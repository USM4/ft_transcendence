import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";
import { useContext } from "react";
import { GameSocketContext } from "./GameSocketContext.jsx";
import { UserDataContext } from "../../DashBoard/UserDataContext.jsx";

const Matchmaking = () => {
    
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [countdown, setCountdown] = useState(3); // Countdown starts at 5
    const { socket } = useContext(GameSocketContext);
    const [player, setPlayer] = useState('player');
    const [playerAvatar, setPlayerAvatar] = useState('');
    const {user } = useContext(UserDataContext);

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

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                // console.log("socket from backend", data);
                if  (data.type ==='game_start'){
                    console.log( "$$$$$$$$$$$$$$$$" ,data.player)
                    setPlayer(data.player);
                    setPlayerAvatar(data.avatar || player2Image);
                    console.log(`DATA KAMLA ------------> ${data}`);
                    setIsReady(true);
                }
                else if (data.type === 'waiting_for_players')
                {
                    setIsReady(false);
                    // console.log(data.message);
                }
                else if (data.type === 'game_over')
                {
                    console.log("##################################### Game Over #####################################");
                    setGameState("Waiting");
                    // console.log(data.message);
                }
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            socket.onclose = () => {
                console.warn("WebSocket connection closed.");
            };
        }
    }
}
    , [socket]);

    return (
        <div className="match-making-global-component">
            <div className="match-making-title">Looking for a player...</div>
            <div className="match-making-container">
                <div className="current-player-card">
                    <div className="current-player-name">
                        <h2>{user.username}</h2>
                    </div>
                    <div className="current-player-img">
                        <img src={user.avatar} alt="Player 1" />
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
                        <h2> {player} </h2>
                    </div>
                    <div className="current-player-img">
                        <img src={playerAvatar || player1Image} alt="Player 2" />
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
