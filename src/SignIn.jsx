import React from "react";
import "./App.css"

function SignIn() {
    const handleSignInClick = () => {
        console.log("Sign In button clicked");
    };

    return (
        <div className="signForm">
            <h2 className="signinhead">Sign In</h2>
            <form className="form">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button className="signinbutton" type="button" onClick={handleSignInClick}>
                    Log In
                </button>
            </form>
        </div>
    );
}
export default SignIn