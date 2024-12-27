import React, { useContext } from "react";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { FriendDataContext } from "./FriendDataContext";

function DashboardFriends() {
    const { friends, setFriends } = useContext(FriendDataContext);

    console.log("FRIENDS", friends);
    return (
        <>
            {friends?.map((friend) => {console.log(friend);
                return (
                    <div key={friend?.id} className="dashboard-friend-item">
                        {
                            friend?.is_online && (
                                <>
                                    <div className="friend-info">
                                        <img src={friend?.avatar} alt={`${friend?.username}'s avatar`} />
                                        <p> {friend?.username} </p>
                                    </div>
                                    <div className="friend-invite">
                                        <button className="invite-btn"><SportsKabaddiIcon /></button>
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