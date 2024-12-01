import React, { useContext, useEffect, useState } from 'react';
import { ChatSocketContext } from './Chat.jsx'


export default function Chat_area({ selected }) {

  const [message, setMessage] = useState([]);
  const socket = useContext(ChatSocketContext);

  useEffect(() => {
    setMessage([])
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.receiver == selected.id || data.sender == data.receiver || data.sender == selected.id)
        setMessage((prevMessages) => [...prevMessages, data]);
    };
  }, [socket, selected])


  const message_history = message.map((msg, index) => (
    <div key={index}>
      {msg.receiver != selected.id
        ? (<div className="message-sent">{msg.message}</div>)
        : (<div className="message"><p className="message-received">{msg.message}</p></div>)
      }
    </div>
  ))


  return (
    <div className="chat-area">
      <div className="message-wrap">
        {message_history}
      </div>
    </div>
  );
}