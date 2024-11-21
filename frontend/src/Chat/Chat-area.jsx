import React, { useEffect, useState } from 'react';


export default function Chat_area({ selected }) {
  
  const [message, setMessage] = useState(null);

  useEffect(() => {
      const socket = new WebSocket(`ws://localhost:8000/ws/chat/`)
      socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setMessage((prevMeassage) => [...prevMeassage, data]);
        }
    }
  )


  return (

    <div className="chat-area">
      <div className="message-wrap">
        <div className="message-received">
          Hello! How are you doing today?
        </div>

        <div className="message">
          <p className="message-sent">I'm doing well, thanks! What about you?I'm doing well, thanks!I'm doing well, thanks! What about you?</p>
        </div>
       
      </div>
    </div>
  );
}