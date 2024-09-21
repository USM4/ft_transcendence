import React from "react";
import { Link } from 'react-router-dom';

import "./App.css"

function SignIn() {
    const handleSignInClick = () => {
        console.log("Sign In button clicked");
    };

    return (
        <div className="signForm">
            <h2 className="signinhead">Sign In</h2>
            <button className="intra_sign_in">
                <img src="./42.svg"></img>
                <p>Sign in with intra</p>
            </button>
            <form className="form">
                <input type="text" placeholder="email or username" />
                <input type="password" className="signInPassword" placeholder="password" />
                <p className="forgotPasswordSignIn">Forgot password ?</p>
                <button className="signinbutton" type="submit" onClick={handleSignInClick}>
                    Login
                </button>
                <div className="msgSignIn">
                    <p>sign up if you don't have an account</p>
                    <Link to="/signup"><span className="signUpLink">Sign Up</span></Link>
                </div>
            </form>
        </div>
    );
}
export default SignIn