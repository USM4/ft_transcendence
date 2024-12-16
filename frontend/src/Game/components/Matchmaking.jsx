import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";

const Matchmaking = () => {
    
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(true);
    const [countdown, setCountdown] = useState(5); // Countdown starts at 5

    useEffect(() => {
        if (isReady) {
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => prev - 1); // Decrementi l countdown
            }, 1000);

            const navigateTimeout = setTimeout(() => {
                // ghaymchi l page online f 3 seconds ila kan ready
                navigate("/tournament/options/game/online");
            }, 5000);

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
                        <h2>Oussama</h2>
                    </div>
                    <div className="current-player-img">
                        <img src={player1Image} alt="Player 1" />
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
                        <h2> Oussama </h2>
                    </div>
                    <div className="current-player-img">
                        <img src={player2Image} alt="Player 2" />
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
