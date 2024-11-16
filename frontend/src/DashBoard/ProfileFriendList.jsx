import React, { useState } from "react";
import SmsIcon from '@mui/icons-material/Sms';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { useNavigate } from "react-router-dom";
import Chat_header from '../Chat/Chat-header.jsx';
import Chat_area from '../Chat/Chat-area.jsx';
import Chat_input from '../Chat/Chat-input.jsx';
import dbzAvatar from '../assets/DBZ.jpg';

const friend =[
    {
        name: "Bob",
        avatar: dbzAvatar,
        lastMessage: "Let's catch up later!Let's catch up laterLet's catch up laterLet's catch up laterLet's catch up later",
      }
  ]
  


function ProfileFriendList({ username, avatar }) {
    const navigate = useNavigate();
    function handleSms() {
        navigate(`/chat`)
        return (
            <div className="chat-wrapepr">
                <div className="chat-main">
                    <Chat_header selected={friend} />
                    <Chat_area selected={friend} />
                    <Chat_input />
                </div>
            </div>
        );
    };
    return (
        <div className="profile-friend-item" onClick={() => navigate(`/dashboard/profile/${username}`)}>
            <div className="profile-friend-info">
                <img src={avatar} alt="" />
                <p> {username} </p>
            </div>
            <div className="dm-friend">
                <button onClick={handleSms} className="invite-btn"><SmsIcon /></button>
                <button className="invite-btn"><SportsKabaddiIcon /></button>
            </div>
        </div>
    );

}
export default ProfileFriendList;