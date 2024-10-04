import React from "react";
import "./App.css"
import { Link } from "react-router-dom";


function HomePage() {
    return(
        <div className="container">
            <div className="body-text">
            <h2>Serve up some fun with live ping-pong, chat,</h2>
            <h2>and good vibes – all in one click!</h2>
            </div>
            <img className="hamster" src="./hamster.png">
            </img>
        </div>
    )
}

export default HomePage