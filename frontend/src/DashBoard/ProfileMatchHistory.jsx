import React, { useContext, useEffect, useState } from "react";
import DetailsIcon from '@mui/icons-material/Details';
import skull from '/skull.jpeg'
import oredoine from '/oredoine.jpeg'
import { UserDataContext } from "./UserDataContext.jsx";
import CancelIcon from '@mui/icons-material/Cancel';
import { FriendDataContext } from "./FriendDataContext.jsx";

/* profile-score-collection
profile-match-history-score
details-icon
*/
function ProfileMatchHistory({ profile,is_user}) {

    const {friends, setFriends} = useContext(FriendDataContext);
    
    let { user } = useContext(UserDataContext);
    const anonyme = skull;
    const [open, setOpen] = useState([false]);
    const [matchDetails, setMatchDetails] = useState(null);
    if (is_user)
        friends.map((friend) => { friend.username === profile.username ? user = friend : null; });
    
    return (
        <div className="profile-match-history-item">
            {(!user?.matchePlayed || user?.matchePlayed.length === 0) ? <h1 className="data-chart-h1">No matches played yet</h1>
                :
            (user?.matchePlayed.map((match, index) => {
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
                                <button className="profile-matches-button" ><DetailsIcon
                                    onClick={() => {
                                        setMatchDetails(match[0]);
                                        setOpen(!open[index]);
                                    }}
                                /></button>
                            </div>
                        </div>
                        {(open && matchDetails === match[0]) &&
                            <div className="match-history-details-info">
                                <button onClick={() => setOpen(false)}><CancelIcon /></button>
                                <ul className="match-history-details">
                                    <li className="match-history-details-items">Match ID: <section>{matchDetails.id}</section></li>
                                    <li className="match-history-details-items">Match Duration: <section>{matchDetails.duration}</section></li>
                                    <li className="match-history-details-items">Match Winner: <section>{matchDetails.winner}</section></li>
                                    <li className="match-history-details-items">Match Score: <section>{`${matchDetails.score_player1} - ${matchDetails.score_player2}`}</section></li>
                                    <li className="match-history-details-items">Match Player 1: <section>{matchDetails.player1.username}</section></li>
                                    <li className="match-history-details-items">Match Player 2: <section>{matchDetails.player2.username}</section></li>
                                    <li className="match-history-details-items">Xp_gained Player 1: <section>{matchDetails.xp_gained_player1}</section></li>
                                    <li className="match-history-details-items">Xp_gained Player 2: <section>{matchDetails.xp_gained_player2}</section></li>
                                </ul>
                            </div>
                        }
                    </div>
                );
            }
            ))
            }
        </div>
    );

};

export default ProfileMatchHistory;