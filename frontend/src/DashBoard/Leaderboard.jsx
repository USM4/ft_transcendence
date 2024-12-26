import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function Leaderboard() {

    const [game_xp, setGame_XP] = useState();

    const location = useLocation();
    const pathname = location.pathname;
    useEffect(() => {
        const getData = async () => {
            if (pathname === '/dashboard') {
                try {
                    const response = await fetch("http://localhost:8000/auth/game_leaderboard/", {
                        method: "GET",
                        credentials: "include",
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setGame_XP(data);
                    }

                } catch (error) {
                    console.error('error getting data :', error);
                }
            }
        };
        getData();
    }, [pathname]);

    return (
        <div className="dashboard-leaderboard-item">
            {game_xp?.game_xp.map((game, index) => {
                return(<div key={game.id} className="leaderboard-info">
                    <img src={game.avatar} alt={`${game.username}'s avatar`} />
                    <p> {'#' + (index + 1)} </p>
                    <p>{game.username} </p>
                    <p className="xp">{`${game.xp} XP`} </p>
                </div>)
            }
            )}
        </div>
    )
}
export default Leaderboard;