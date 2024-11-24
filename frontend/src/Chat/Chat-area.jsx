import React, { useContext, useEffect, useState } from 'react';
import {ChatSocketContext} from './Chat.jsx'

export default function Chat_area({ selected }) {

  const [message, setMessage] = useState([]);
  const socket = useContext(ChatSocketContext);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage((prevMeassage) => [...prevMeassage, data]);
    }
  }, [socket]
  )
  
  const message_history = message.map((msg, index) => (
    <div key={index}>
      {msg.receiver != selected.id
        ? (<div className="message-received">{msg.message}</div>)
        : (<div className="message"><p className="message-sent">{msg.message}</p></div>)
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