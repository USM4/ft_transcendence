import React, { useState } from "react";
import SmsIcon from '@mui/icons-material/Sms';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";




function ProfileFriendList({ username, avatar,id }) {
    const navigate = useNavigate();
    const friend = {id: id,username: username, avatar: avatar };

    function handleSms() {
        navigate(`/chat`, { state: { friend } })
    };

    const  inviteFriendToGame = async () => {
        console.log("invite friend to game");
        const response = await fetch("http://localhost:8000/auth/game_invite/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                to_user: friend.id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(data.message);
        }
        else {
            toast.error(data.error);
        }
    }


    return (
        <div className="profile-friend-item" >
            <div className="profile-friend-info" >
                {/* {console.log("---------------> ",friend)} */}
                <button className="friendlist-profile-nav" onClick={() => navigate(`/dashboard/profile/${friend.username}`)}>
                    <img src={avatar} alt="" />
                    <p style={{fontFamily : 'inherit'}}> {username} </p>
                </button>
            </div>
            <div className="dm-friend">               
                <button onClick={handleSms} className="invite-btn"><SmsIcon /></button>
                <button className="invite-btn"
                    onClick={inviteFriendToGame}>
                    <SportsKabaddiIcon />
                </button>
            </div>
        </div >
    );

}
export default ProfileFriendList;