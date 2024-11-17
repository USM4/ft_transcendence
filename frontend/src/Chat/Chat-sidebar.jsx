import React, { useState } from 'react';
import Chat_header from './Chat-header.jsx';
import Chat_area from './Chat-area.jsx';
import Chat_input from './Chat-input.jsx';
import '../App.css'
import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';

export default function Chat_sidebar({ friends }) {
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleClick(friend) {
    setSelectedFriend(friend);
  }

  const friendsList = friends.map((friend, index) => (
    <>
      <li key={index} className="user" onClick={() => handleClick(friend)}>
        <div className="avatar">
          <img src={friend.avatar} alt={`${friend.avatar}'s avatar`} />
          {/* I NEED THE ONLINE STATUS TO CHECK WICH ONE TO DISPLAY */}
          {/* ONLINE         
            <Badge variant="dot"
            color="success" showZero badgeContent="" overlap="circular"></Badge>  */}
          {/* OFFLINE */}
          <Badge variant="dot"
            color="error" showZero badgeContent="" overlap="circular"></Badge>
        </div>
        <div className="details">
          <p className="name">{friend.name}</p>
          <p className="lastmsg">{friend.lastMessage}</p>
        </div>
      </li>
    </>
  ));


  return (
    <div className="chat-wrapper">
      <div className="chat-sidebar">
        <ul className="user-list">
          {friendsList}
        </ul>
      </div>

      {!selectedFriend && <div className="default">
        <ChatIcon style={{ fontSize: 200 }} />
      </div>}

      {selectedFriend && (
        <div className="chat-main">

          <Chat_header selected={selectedFriend}></Chat_header>
          <Chat_area selected={selectedFriend}></Chat_area>
          <Chat_input></Chat_input>
        </div>
      )}
    </div>
  );
}