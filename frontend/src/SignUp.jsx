import React from "react";
import "./App.css"
import { Link } from "react-router-dom";
import SignIn from './SignIn.jsx'


function SignUp() {

    return (
        <div className="signForm">
            <h2 className="signinhead">Sign Up</h2>
            <button className="intra_sign_in">
                <img src="./42.svg"></img>
                <p>Sign up with intra</p>
            </button>
            <form className="form">
                <input type="text" placeholder="email or username" />
                <input type="password" className="signInPassword" placeholder="password" />
                <input type="password" className="signInPassword" placeholder="confirm your password" />
                <button className="signinbutton" type="button">
                    Sign Up
                </button>
                <div className="msgSignIn">
                    <p>if you already have an account</p>
                    <Link to="/signin" className="msgSignIn"><span className="signUpLink">Sign In</span></Link>
                </div>                
            </form>
        </div>
    )
};
export default SignUp