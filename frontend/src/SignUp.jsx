import React, { useState } from "react";
import "./App.css"
import { Link } from "react-router-dom";
import SignIn from './SignIn.jsx'


function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);

    const handle42Intra = () =>{
        const client_id=import.meta.env.VITE_CLIENT_ID;
        const auth_url = 'https://api.intra.42.fr/oauth/authorize';
        const response_type = 'code';
        const redirectUri='http://localhost:8000/accounts/42school/login/callback/';
        const auth_url_concatinated = `${auth_url}?client_id=${client_id}&redirect_uri=${redirectUri}&response_type=${response_type}`;
        window.location.href = auth_url_concatinated;
    };
    const handleSignUpClick = async(e) => {
        setErrorMessages([]);
        setSuccessMessages([]);
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/auth/signup/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password , newpassword}),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok)
        {
            const successmsg = Object.values(data);
            setSuccessMessages(successmsg);
        }
        else 
        {
            if (!response.ok) {
                const errors = Object.values(data);
                setErrorMessages(errors);
            }
        }
    };

    return (
        <div className="signForm">
            <h2 className="signinhead">Sign Up</h2>
            <button className="intra_sign_in" type='submit' onClick={handle42Intra}>
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
            {errorMessages.length > 0 && (
            <div className="error-messages">
                {errorMessages.map((error, index) => (
                    <p key={index} className="error">{error}</p>
                ))}
            </div>
            )}
            {successMessages.length > 0 && (
            <div className="success-messages">
                {successMessages.map((success, index) => (
                    <p key={index} >{success}</p>
                ))}
            </div>
            )}
        </div>
    )
};
export default SignUp