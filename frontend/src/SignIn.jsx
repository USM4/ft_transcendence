import React, { useState, useEffect } from "react";
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import "./App.css"

function SignIn() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);
    const navigate = useNavigate();
    const handle42Intra = () =>{
        const redirectUrl = window.
    };
    const handleSignInClick = async(e) => {
        e.preventDefault();
        setErrorMessages([]);
        setSuccessMessages([]);
        e.preventDefault();
        const response = await fetch('http://localhost:8000/auth/signin/',
        {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({login, password}),
            credentials: 'include',
        });
        const val = await response.json();
        if (response.ok)
        {
            console.log(Object.values(val));
            navigate('/dashboard');
        }
        else 
        {
            if (!response.ok) {
                const errors = Object.values(val);
                setErrorMessages(errors);
            }
        }
    };

    return (
        <div className="signForm">
            <h2 className="signinhead">Sign In</h2>
            <button className="intra_sign_in" type="submit" onClick={handle42Intra}>
                <img src="./42.svg"></img>
                <p>Sign in with intra</p>
            </button>
            <form className="form" >
                <input  type="text"
                        placeholder="email or username"
                        value ={login}
                        onChange={(e) => setLogin(e.target.value)}
                        />
                <input  type="password"
                        className="signInPassword"
                        placeholder="password"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)
                        }
                        />
                <p className="forgotPasswordSignIn">Forgot password ?</p>
                <button className="signinbutton" type="submit" onClick={handleSignInClick}>
                    Login
                </button>
                <div className="msgSignIn">
                    <p>sign up if you don't have an account</p>
                    <Link to="/signup"><span className="signUpLink">Sign Up</span></Link>
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
    );
}
export default SignIn