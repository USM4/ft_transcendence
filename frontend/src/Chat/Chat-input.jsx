import React, { useState, useEffect, useContext } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { ChatSocketContext } from './Chat.jsx'

export default function Chat_input({ selected }) {
    const [message, setMessage] = useState();
    const socket = useContext(ChatSocketContext);


    function handleSubmit() {
        {
            message && (socket.send(
                JSON.stringify({
                    message: message,
                    receiver: selected.id,
                    time: new Date().toLocaleTimeString(),
                }
                )
            ))
            setMessage('');
        }
    }

    return (
        <div className="chat-input">

            <div className="text-area">
                <textarea className="text-areas-input"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}

                />
            </div>
            <div className="button-area">
                <button onClick={() => handleSubmit()} type="submit"><SendRoundedIcon /></button>
            </div>
        </div>
    );
}