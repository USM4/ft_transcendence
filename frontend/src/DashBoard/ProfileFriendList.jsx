import React, { useState } from "react";
import SmsIcon from '@mui/icons-material/Sms';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { useNavigate } from "react-router-dom";




function ProfileFriendList({ username, avatar,id }) {
    const navigate = useNavigate();
    const friend = {id: id,username: username, avatar: avatar };

    function handleSms() {
        navigate(`/chat`, { state: { friend } })
    };
    return (
        <div className="profile-friend-item" >
            <div className="profile-friend-info" >
                {console.log("---------------> ",friend)}
                <button className="friendlist-profile-nav" onClick={() => navigate(`/dashboard/profile/${friend.username}`)}>
                    <img src={avatar} alt="" />
                    <p> {username} </p>
                </button>
            </div>
            <div className="dm-friend">               
                <button onClick={handleSms} className="invite-btn"><SmsIcon /></button>
                <button className="invite-btn"><SportsKabaddiIcon /></button>
            </div>
        </div >
    );

}
export default ProfileFriendList;