import React, { useState, useEffect } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


export default function Chat_input() {
    const [message, setMessage] = useState();

    function handleSubmit() {
        
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
                <button onClick={handleSubmit} type="submit"><SendRoundedIcon /></button>
            </div>
        </div>
    );
}