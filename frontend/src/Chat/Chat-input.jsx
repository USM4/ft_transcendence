import React, { useState, useEffect } from 'react';



export default function Chat_input() {
    const [message, setMessage] = useState();

    function handleSubmit() {

    }

    return (
        <div className="chat-input">
            <div className="text-areas-input">
                <input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            {/* <div className="text-area">
                 {/* <button onClick={handleSubmit} type="submit">Send</button> */}
            {/* </div> */}
        </div>
    );
}