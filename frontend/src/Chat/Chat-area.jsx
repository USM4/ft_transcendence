import React, { useContext, useEffect, useState } from 'react';
import { ChatSocketContext } from './Chat.jsx'
import BlockIcon from '@mui/icons-material/Block';


export default function Chat_area({ selected }) {

  const [message, setMessage] = useState({});
  const [chatroom, setChatroom] = useState();
  const socket = useContext(ChatSocketContext);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { chat_room, message, message_id } = data;

      setChatroom(chat_room);
      if (message){

        setMessage((prevMessage) => {
          const chatMessage = prevMessage[chat_room] || [];
          const messageExists = chatMessage.some((msg) => msg.message_id === message_id);
          
          
          if(!messageExists) {
            return {
              ...prevMessage,
              [chat_room]: [...chatMessage, data],
            };
          }
          return prevMessage;
        });
      }
    };
  }, [socket, selected])


  const chatroomMessages = message[chatroom] || [];
  // console.log(chatroomMessages)
  // console.log(chatroom)
  // console.log(selected)

  const message_history = chatroomMessages.map((msg, index) => (
    <div key={index}>
      {msg.receiver != selected.id
        ? (<div className="message-sent">{msg.message}</div>)
        : (<div className="message"><p className="message-received">{msg.message}</p></div>)
      }
    </div>
  ))


  return (
    <div className="chat-area">

      {!selected.is_blocked ? <div className="message-wrap">{message_history}</div> : <div className="blocked">THIS USER IS BLOCKED <BlockIcon fontSize='large' /></div>}

    </div>
  );
}
