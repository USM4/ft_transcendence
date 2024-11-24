import React, { useContext, useEffect, useState } from 'react';
import { ChatSocketContext } from './Chat.jsx'
import { UserDataContext } from "../DashBoard/UserDataContext.jsx";

export default function Chat_area({ selected }) {

  const [message, setMessage] = useState([]);
  const socket = useContext(ChatSocketContext);

  useEffect(() => {
    let messageHistory = [];
    setMessage([])

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      messageHistory.push(data);
      setMessage([...messageHistory]);
    };
  }, [socket, selected]
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