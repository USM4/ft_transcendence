import React, { useContext } from "react";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { FriendDataContext } from "./FriendDataContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DashboardFriends() {
    const { friends, setFriends } = useContext(FriendDataContext);
    const navigate = useNavigate()
    
    const handleClick = (friendId, friendUsername) => () => {
        handleDashboardGameInvite(friendId, friendUsername);
    };
    const handleDashboardGameInvite = async (friendId, friendUsername) => {
            const host=import.meta.env.VITE_HOST_URL;
            const response = await fetch(`${host}/auth/game_invite/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    to_user: friendId,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                navigate("/tournament/options/game/matchMaking", {state: { type: "game_invite", opponent: friendUsername}});
            }
            else
                toast.error(data.error);
    };

    return (
        <>
            {friends?.map((friend) => {
                return (
                    <div key={friend?.id} className="dashboard-friend-item">
                        {
                            friend?.is_online && (
                                <>
                                    <div className="friend-info" onClick={() => navigate(`/dashboard/profile/${friend?.username}`)}>
                                        <img src={friend?.avatar} alt={`${friend?.username}'s avatar`} />
                                        <p> {friend?.username} </p>
                                    </div>
                                    <div className="friend-invite">
                                        <button className="invite-btn"
                                            onClick={handleClick(friend.id, friend.username)}
                                         ><SportsKabaddiIcon />
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                );
            })}
        </>
    );

}
export default DashboardFriends;