import React, { useState, useEffect } from 'react';
import Chat_header from './Chat-header.jsx';
import Chat_area from './Chat-area.jsx';
import Chat_input from './Chat-input.jsx';
import '../App.css'
import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FriendDataContext } from '../DashBoard/FriendDataContext.jsx'
import { ChatSocketContext } from './Chat.jsx'


export default function Chat_sidebar() {
	const { friends } = useContext(FriendDataContext)
	const location = useLocation();
	const socket = useContext(ChatSocketContext);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [clicked, setClicked] = useState(null);

	useEffect(() => {
		if (location.state && location.state.friend) {
			handleClick(location.state.friend)
		}
	}, [location]);



	function handleClick(friend) {
		if (!selectedFriend)
			setSelectedFriend(friend);
		if (selectedFriend && selectedFriend.id != friend.id)
			setSelectedFriend(friend);
		console.log(friend)
		{ clicked != friend.id && (socket.send(JSON.stringify({ type:'message', message: null, receiver: friend.id, flag: friend.is_blocked, })), setClicked(friend.id)) }
	}

	const friendsList = friends.map((friend) => (
		<li key={friend.id} className="user" onClick={() => handleClick(friend)}>
			<div className="avatar">
			<Badge
                        color={!friend.is_online ? "error" : "success"}
                        variant="dot"
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
					<img src={friend.avatar} alt={`${friend.username}'s avatar`} />
				</Badge>
			</div>
			<div className="details">
				<p className="name">{friend.username}</p>
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
					<Chat_input selected={selectedFriend}></Chat_input>
				</div>
			)}
		</div>
	);
}