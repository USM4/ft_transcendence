import React from "react";
import "./App.css"
import { Link } from "react-router-dom";

function Navbar () {
    return(
        <div className="navigate"> 
        <ul className ="navbar">
          <li>    
            <Link to="/">
            <button className="logo"> Smash it </button>
            </Link>
          </li>
          <li>
            <Link to="features">
            <button className="navbutton"> Features</button>
            </Link>
          </li>
          <li>
            <Link to="howtoplay">
            <button className="navbutton"> How to Play</button>
            </Link>
          </li>
          <li>
            <Link to="signin">
            <button className="navbutton"> Sign in</button>
            </Link>
          </li>
        </ul>
      </div>
    )
}
export default Navbar