import React from "react";
import "./App.css"
import { Link } from "react-router-dom";

const Navbar = function() {
    return(
        <div className="navigate"> 
        <ul className ="navbar">
          <li>    
            <Link to="/">
            <button className="navbutton"> Authentification </button>
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