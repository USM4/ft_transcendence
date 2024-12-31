import React, { useState, useEffect, useContext } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { ChatSocketContext } from './Chat.jsx'

export default function Chat_input({ selected }) {
    const [message, setMessage] = useState('');
    const socket = useContext(ChatSocketContext);


    function handleSubmit() {
        {
            if (selected.is_blocked) {
                return;
            }
            (message && message.trimStart()) && (socket.send(
                JSON.stringify({
                    type: 'message',
                    message: message,
                    receiver: selected.id,
                    time: new Date().toLocaleTimeString(),
                    flag: null,
                }
                )
            ))
            setMessage('');
        }
    }


    return (
        <div className="chat-input">

            {!selected.is_blocked ?
                (<><div className="text-area">
                    <textarea className="text-areas-input"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value !== '\n' ? e.target.value : '')}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSubmit() : null}

                    /></div>
                    <div className="button-area"><button onClick={() => handleSubmit()} type="submit"><SendRoundedIcon /></button></div></>)
                : null}
        </div>
    );
}