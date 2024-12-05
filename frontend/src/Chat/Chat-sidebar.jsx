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
	const [message, setMessage] = useState({});
	const [chatroom, setChatroom] = useState();
	const { friends } = useContext(FriendDataContext)
	const location = useLocation();
	const socket = useContext(ChatSocketContext);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [clicked, setClicked] = useState(null);
	const [friendsList, setFriendsList] = useState([]);

	useEffect(() => {
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const { chat_room, message, message_id } = data;
			console.log(data);


			if (chat_room)
				setChatroom(chat_room);
			if (message) {

				setMessage((prevMessage) => {
					const chatMessage = prevMessage[chat_room] || [];
					const messageExists = chatMessage.some((msg) => msg.message_id === message_id);


					if (!messageExists) {
						return {
							...prevMessage,
							[chat_room]: [...chatMessage, data],
						};
					}
					return prevMessage;
				});
			}
			else if (data.type !== 'online') {
				setMessage((prevMessage) => {
					const chatMessage = prevMessage[chat_room] || [];
					return {
						...prevMessage,
						[chat_room]: chatMessage,
					};
				});
			}
			// else if (data.type === 'block') {
			// 	friends.map((friend) => {
			// 		if (friend.id == data.friend_id) {
			// 			friend.is_blocked = data.flag;
			// 		}
			// 		setFriendsList((prevFriends) => {
			// 			return prevFriends.map((friend) =>
			// 				friend.id === data.id ? { ...friend, ...data } : friend
			// 			);
			// 		});
			// 	});
			// }
			else {
				friends.map((friend) => {
					if (friend.id == data.friend_id) {
						friend.is_online = data.online;
					}
					setFriendsList((prevFriends) => {
						return prevFriends.map((friend) =>
							friend.id === data.id ? { ...friend, ...data } : friend
						);
					});
				})
			}
		};
	}, [socket])
	const chatroomMessages = message[chatroom] || [];

	useEffect(() => {
		if (location.state && location.state.friend) {
			const friende = friends.find((friend) => friend.id === location.state.friend.id);
			handleClick(friende)
		}
	}, [location]);

	function handleClick(friend) {
		if (!selectedFriend)
			setSelectedFriend(friend);
		if (selectedFriend && selectedFriend.id != friend.id)
			setSelectedFriend(friend);
		{ clicked != friend.id && (socket.send(JSON.stringify({ type: 'history', message: null, receiver: friend.id, flag: null, })), setClicked(friend.id)) }
	}
	useEffect(() => {
		const fetchStatuses = async () => {
			socket.send(JSON.stringify({ type: 'online', message: null, receiver: null, flag: null, }));
		};

		fetchStatuses();

		const interval = setInterval(fetchStatuses, 10000);

		return () => clearInterval(interval);
	}, [socket]);
	useEffect(() => {
		setFriendsList(friends.map((friend) => (
			<li key={friend.id} className="user" onClick={() => handleClick(friend)}>
				<div className="avatar">
					<Badge
						sx={{
							'& .MuiBadge-dot': {
								backgroundColor: friend.is_online ? '#00ff00' : '#ff0000',
							},
						}}
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
		)));
	}, [friends]);


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
					<Chat_area selected={selectedFriend} chatroomMessages={chatroomMessages}></Chat_area>
					<Chat_input selected={selectedFriend}></Chat_input>
				</div>
			)}
		</div>
	);
}