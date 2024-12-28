import React, { useContext, useEffect, useState } from 'react';
import { ChatSocketContext } from './Chat.jsx'
import BlockIcon from '@mui/icons-material/Block';
import { UserDataContext } from '../DashBoard/UserDataContext.jsx';

export default function Chat_area({ selected,chatroomMessages }) {

  const { user } = useContext(UserDataContext);


  const message_history = chatroomMessages.map((msg, index) => (
    <div key={index}>
      {msg.receiver == selected.id && <div className="message"><p className="message-received">{msg.message}</p></div>}
      {msg.receiver == user.id && (<div className="message-sent">{msg.message}</div>)}
    </div>
  ))

  return (
    <div className="chat-area">

      {!selected.is_blocked 
      ? (<div className="message-wrap">{message_history}</div> )
      : (selected.blocker !== selected.username
      ? (<div className="blocked">YOU HAVE BLOCKED THIS USER <BlockIcon fontSize='large' /></div>)
      : (<div className="blocked">YOU ARE BLOCKED <BlockIcon fontSize='large' /></div>))
}

    </div>
  );
}
