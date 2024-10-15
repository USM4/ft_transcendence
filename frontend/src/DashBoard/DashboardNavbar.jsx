import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsToggle from "./NotificationsToggle.jsx";
import SearchIcon from "@mui/icons-material/Search";
import oredoine from "../../public/oredoine.jpeg";
import '../App.css'

function DashboardNavbar() {
    const navigate = useNavigate()
    const [showNotification, setShowNotification] = useState(false)
    const [profileToggle, setprofileToggle] = useState(false)
    return(
        <div className="dashboard-navbar">
        <div className="search-btn">
          <input className="search-input" placeholder="Search" />
          <button className="search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="notification-and-profile">
          <div className="notification">
            {/* <button onClick={showNotificationToggle} className="notification-icon"> */}
            <button onClick={()=>setShowNotification(!showNotification)} className="notification-icon">
              <NotificationsIcon/>
            </button>
              {showNotification && ( <div className="notifications-container">
                  <NotificationsToggle/>
                  <NotificationsToggle/>
                  <NotificationsToggle/>
                </div>
              )}
          </div>
          <div className="profile">
            <button onClick={() => setprofileToggle(!profileToggle)} className="profile-btn"><img className="profile-img" src={oredoine} /></button>
            {profileToggle && (
              <div className="profile-dropdown">
                <button className="dropdown-elements" onClick={() => {
                  navigate('profile')
                }}>profile</button>
                <button className="dropdown-elements" >settings</button>
                <button onClick={() => {
                navigate('/')
                }} 
                className="dropdown-elements">Logout</button>
              </div>
              )
            }  
          </div>
        </div>
        </div>
    );
} export default DashboardNavbar;



