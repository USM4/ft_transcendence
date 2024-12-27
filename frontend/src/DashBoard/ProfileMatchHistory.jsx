import React, { useContext, useEffect, useState } from "react";
import DetailsIcon from '@mui/icons-material/Details';
import skull from '/skull.jpeg'
import oredoine from '/oredoine.jpeg'
import { UserDataContext } from "./UserDataContext.jsx";
import CancelIcon from '@mui/icons-material/Cancel';

/* profile-score-collection
profile-match-history-score
details-icon
*/
function ProfileMatchHistory() {
    const { user } = useContext(UserDataContext);
    const anonyme = skull;
    const [open, setOpen] = useState([false]);
    const [matchDetails, setMatchDetails] = useState(null);

    return (
        <div className="profile-match-history-item">
            {user?.matchePlayed.length === 0 && <h1 className="data-chart-h1">No matches played yet</h1>}
            {user?.matchePlayed.map((match, index) => {
                console.log("Match -----", match)
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
                                        setOpen(!open[index]);
                                    }}
                                /></button>
                            </div>
                        </div>
                        {(open && matchDetails === match[0]) &&
                            <div className="win-page">
                                <button onClick={() => setOpen(false)}><CancelIcon /></button>
                                <ul className="match-history-details">
                                    <li>Match ID: {matchDetails.id}</li>
                                    <li>Match Duration: {matchDetails.duration}</li>
                                    <li>Match Winner: {matchDetails.winner}</li>
                                    <li>Match Score: {matchDetails.score}</li>
                                    <li>Match Player 1: {matchDetails.player1.username}</li>
                                    <li>Match Player 2: {matchDetails.player2.username}</li>
                                    <li>Xp_gained Player 1: {matchDetails.xp_gained_player1}</li>
                                    <li>Xp_gained Player 2: {matchDetails.xp_gained_player2}</li>
                                </ul>
                            </div>
                        }
                    </div>
                );
            })}
        </div>
    );

};

export default ProfileMatchHistory;