import React from 'react';


export default function Chat_area({ selected }) {

  const socket = 

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