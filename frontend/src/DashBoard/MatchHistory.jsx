import React, { useContext } from "react";
import skull from '../../public/skull.jpeg'
import { UserDataContext } from "./UserDataContext.jsx";


function MatchHistory() {
    const { user } = useContext(UserDataContext);
    const matches = user.matchePlayed

    return (
        <div>
            {matches.map((match) => {
                const player1 = match[0]['player1'];
                const player2 = match[0]['player2'];
                return (
                    <div key={match[0].id} className="match-history-item">
                        <div className="match-history-info">
                            <img
                                src={player1.avatar || skull}
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
                                src={player2.avatar || skull}
                                alt={`${player2.username}'s avatar`}
                                className="img-player2"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MatchHistory;