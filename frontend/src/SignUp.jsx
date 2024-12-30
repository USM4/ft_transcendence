import React, { useState } from "react";
import "./App.css"
import { Link } from "react-router-dom";
import SignIn from './SignIn.jsx'
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);
    const navigate = useNavigate();
    const handleSignUpClick = async(e) => {
        setErrorMessages([]);
        setSuccessMessages([]);
        e.preventDefault();
        const host=import.meta.env.VITE_HOST_URL;
        const response = await fetch(`${host}/auth/signup/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password , newpassword}),
        });
        const data = await response.json();
        if (response.ok)
        {
            const successmsg = Object.values(data);
            setSuccessMessages(successmsg);
            navigate('/signin');
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
            <form className="form-validation" onSubmit={handleSignUpClick}>
                <input  type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{backgroundColor: "black", color: "white", border: "1px dashed #cc9a2c" , borderRadius: "5px", outline: "none"}}
                        />
                <input  type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{backgroundColor: "black", color: "white", border: "1px dashed #cc9a2c" , borderRadius: "5px", outline: "none"}}
                        />
                <input  type="password"
                        className="signInPassword"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{backgroundColor: "black", color: "white", border: "1px dashed #cc9a2c" , borderRadius: "5px", outline: "none"}}
                        />
                <input  type="password"
                        className="signInPassword"
                        placeholder="confirm your password"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{backgroundColor: "black", color: "white", border: "1px dashed #cc9a2c" , borderRadius: "5px", outline: "none"}}
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