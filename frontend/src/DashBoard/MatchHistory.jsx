import React, { useContext } from "react";
import anonyme from '../../public/anonyme.png'
import { UserDataContext } from "./UserDataContext.jsx";


function MatchHistory() {
    const { user } = useContext(UserDataContext);

    return (
        <div className="match-history-container" style={{ justifyContent: user?.matchePlayed.length === 0 ? 'center' : undefined }}>
            <div className="match-history-result">
                {user?.matchePlayed.length === 0 && <h1 className="data-chart-h1">No matches played yet</h1>}
                {user?.matchePlayed.map((match) => {
                    const player1 = match[0]['player1'];
                    const player2 = match[0]['player2'];
                    return (
                        <div key={match[0].id} className="match-history-item">
                            <div className="match-history-info">
                                <img
                                    src={player1.avatar || anonyme}
                                    alt={`${player1.username}'s avatar`}
                                    className="img-player"
                                />
                                {player1.username}
                            </div>
                            <div className="match-history-score">
                                {`${match[0]['score_player1']} - ${match[0]['score_player2']}`}
                            </div>
                            <div className="match-history-info">
                                {player2.username}
                                <img
                                    src={player2.avatar || anonyme}
                                    alt={`${player2.username}'s avatar`}
                                    className="img-player2"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MatchHistory;