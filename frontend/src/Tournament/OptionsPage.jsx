import React from "react";
import { Link, useNavigate } from "react-router-dom";


const OptionsPage = () => {
const navigate = useNavigate();
return (
    <div className="options-component">
            <div className="tournament-welcoming">
                <p>Welcome to Ping Pong Arena!</p>
                <p>Choose your game mode and let’s get started!</p>
            </div>
            <div className="options">
                <div className="option">
                    <button 
                        onClick={() => {navigate('game')}}
                    >Play Vs Friend</button>
                </div>
                <div className="option">
                    <button
                        type="submit"
                        onClick={() => {
                            navigate('tournament-registration');
                        }}
                    >Play a Tournament</button>
                </div>
            </div>
        </div>
    );
};
export default OptionsPage;