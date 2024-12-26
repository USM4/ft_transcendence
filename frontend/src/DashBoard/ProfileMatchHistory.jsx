import React, { useContext } from "react";
import DetailsIcon from '@mui/icons-material/Details';
import skull from '/skull.jpeg'
import oredoine from '/oredoine.jpeg'
import { UserDataContext } from "./UserDataContext.jsx";

/* profile-score-collection
profile-match-history-score
details-icon
*/
function ProfileMatchHistory() {
    const { user } = useContext(UserDataContext);


    return (
        <div className="profile-match-history-item">
            {user?.matchePlayed.length === 0 && <h1 className="data-chart-h1">No matches played yet</h1>}
            {user?.matchePlayed.map((match) => {
                const player1 = match[0]['player1'];
                const player2 = match[0]['player2'];
                return (
                    <div key={match[0].id} className="profile-matches">
                        <div className="profile-match-history-info">
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
                        <div className="profile-match-history-info">
                            {player2.username}
                            <div className="details-icon">

                                <img
                                    src={player2.avatar || anonyme}
                                    alt={`${player2.username}'s avatar`}
                                />
                                <button ><DetailsIcon
                                    onClick={() => {
                                        setMatchDetails(match[0]);
                                        setOpen(true);
                                    }}
                                /></button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

};

export default ProfileMatchHistory;