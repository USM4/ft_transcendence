import React, { useState } from "react";
import "./App.css"
import { Link } from "react-router-dom";
import SignIn from './SignIn.jsx'


function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
            body: JSON.stringify({username, email, password}),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok)
            console.log("Signed up successfully!");
        else 
        {
            if (response.status === 400)
                console.error(data.error);
        }
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
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                <input  type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                <input  type="password"
                        className="signInPassword"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                <input  type="password"
                        className="signInPassword"
                        placeholder="confirm your password"
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