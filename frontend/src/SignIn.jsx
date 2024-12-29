import React, { useState, useEffect } from "react";
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./App.css"
import toast from "react-hot-toast";

function SignIn() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);
    const navigate = useNavigate();     

    const handle42Intra = () =>{
        const client_id=import.meta.env.VITE_CLIENT_ID;
        const auth_url = 'https://api.intra.42.fr/oauth/authorize';
        const response_type = 'code';
        const redirectUri='https://localhost:443/accounts/42school/login/callback/';
        const auth_url_concatinated = `${auth_url}?client_id=${client_id}&redirect_uri=${redirectUri}&response_type=${response_type}`;
        console.log("aaaaaaaauth --------> ",auth_url_concatinated);
        window.location.href = auth_url_concatinated;
    };
    const handleSignInClick = async(e) => {
        e.preventDefault();
        setErrorMessages([]);
        setSuccessMessages([]);
        try {
            const response = await fetch('https://localhost:443/auth/signin/', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({login, password}),
                credentials: 'include',
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setSuccessMessages(data);
                navigate(data.redirect_url);
            }
        }
        catch (error) {
            console.error('Error:');
            setErrorMessages(["An error occurred. Please try again."]);
        }
    };

    return (
        <div className="signForm">
            <h2 className="signinhead">Sign In</h2>
            <button className="intra_sign_in" type="submit" onClick={handle42Intra}>
                <img src="./42.svg"></img>
                <p>Sign in with intra</p>
            </button>
            <form className="form-validation" >
                <input  type="text"
                        placeholder="email or username"
                        value ={login}
                        onChange={(e) => setLogin(e.target.value)}
                        style={{backgroundColor: "black", color: "white", border: "1px dashed #cc9a2c" , borderRadius: "5px", outline: "none"}}
                        />
                <input  type="password"
                        placeholder="password"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{backgroundColor: "black", color: "white", border: "1px dashed #cc9a2c" , borderRadius: "5px", outline: "none"}}
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
};
export default SignIn