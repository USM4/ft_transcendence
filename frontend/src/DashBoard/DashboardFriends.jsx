import React, { useContext } from "react";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { FriendDataContext } from "./FriendDataContext";

function DashboardFriends() {
    const { friend } = useContext(FriendDataContext);



    return (
        <>
            {friend?.map((friend) => {
                return (
                    <div key={friend?.id} className="dashboard-friend-item">
                        <div className="friend-info">
                            <img src={friend?.avatar} alt={`${friend?.username}'s avatar`} />
                            <p> {friend?.username} </p>
                        </div>
                        <div className="friend-invite">
                            <button className="invite-btn"><SportsKabaddiIcon /></button>
                        </div>
                    </div>
                );
            })}
        </>
    );

}
export default DashboardFriends;