import React, { useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


function TwoFa() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const checkOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/check_otp/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'otp': otp}),
      });
      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="signForm">
      <h2 className="signinhead">Two Factor Authentification</h2>
      <form className="form-validation">
        <input
          type="text"
          placeholder="Enter the code"
          maxLength={6}
          pattern="[0-9]{6}"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="signinbutton" type="submit" onClick={checkOtp}>
          Login
        </button>
      </form>
    </div>
  );
}
export default TwoFa;
