import React, { useState } from "react";
import "./App.css"
import { Link } from "react-router-dom";
import SignIn from './SignIn.jsx'


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    const handleSignUpClick = async(e) => {
        e.preventDefault();
        if (password !== newpassword) 
        {
            console.log("Passwords not matching");
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/auth/signup/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        const data = await response.json();
        if (response.ok)
            console.log("Signed up successfully !!!!!!!!!!!! ");
        else
        {
            const data = await response.json();
            setErrorMessage(data.error || "Sign up failed!"); // Show error message if available
            console.log("Sign up failed!");
        }
        console.log("Sign up button clicked");
    };

    return (
        <div className="signForm">
            <h2 className="signinhead">Sign Up</h2>
            <button className="intra_sign_in">
                <img src="./42.svg"></img>
                <p>Sign up with intra</p>
            </button>
            <form className="form" onSubmit={handleSignUpClick}>
                <input  type="text"
                        placeholder="email or username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                <input  type="password"
                        className="signInPassword"
                        placeholder="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                <input  type="password"
                        className="signInPassword"
                        placeholder="confirm your password"
                        autoComplete="current-password"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        />
                <button className="signinbutton" type="submit">
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