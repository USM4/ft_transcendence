import React, { useState, useEffect } from 'react';
import Chat_header from './Chat-header.jsx';
import Chat_area from './Chat-area.jsx';
import Chat_input from './Chat-input.jsx';
import '../App.css'
import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {FriendDataContext} from '../DashBoard/FriendDataContext.jsx'


export default function Chat_sidebar() {
  const {friends} = useContext(FriendDataContext)
  const location = useLocation();
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    if (location.state && location.state.friend) {
      setSelectedFriend(location.state.friend);
    }
  }, [location]);

  function handleClick(friend) {
    setSelectedFriend(friend);
  }
  const friendsList = friends.map((friend) => (
      <li key={friend.id} className="user" onClick={() => handleClick(friend)}>
        <div className="avatar">
          <Badge
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color="success"
            overlap="circular">
                  <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
          </Badge>
        </div>
        <div className="details">
          <p className="name">{friend.username}</p>
          <p className="lastmsg">{friend.lastMessage}</p>
        </div>
      </li>
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