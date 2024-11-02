import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsToggle from "./NotificationsToggle.jsx";
import SearchIcon from "@mui/icons-material/Search";
// import oredoine from "../../public/oredoine.jpeg";
import { UserDataContext } from './UserDataContext.jsx'
import '../App.css'

function DashboardNavbar() {
    const navigate = useNavigate()
    const [showNotification, setShowNotification] = useState(false)
    const [profileToggle, setprofileToggle] = useState(false)
  
    const {user} = useContext(UserDataContext);
    
    const handleLogout = async () => {
      try {
          alert('are you sure')
          const response = await fetch( 'http://localhost:8000/auth/logout/',
          {
            method: 'POST',
            credentials: 'include',
          })
          if(response.ok)
            navigate('/signin') 
      } catch (error) {
          console.error('Error logging out :', error);
      }
    }

    return(
        <div className="dashboard-navbar">
          <div className="search-btn">
              <div className="search-input"><input placeholder="Search" />
                  <button className="search-icon">
                  <SearchIcon />
                </button>
              </div>
          </div>
          <div className="notification-and-profile">
            <div className="notification">
              <button onClick={()=>setShowNotification(!showNotification)} className="notification-icon">
                <NotificationsIcon/>
              </button>
                  {showNotification && ( 
                    <div className="notifications-container">
                      <NotificationsToggle/>
                    </div>
                  )}
            </div>
            <div className="profile">
              <button onClick={() => setprofileToggle(!profileToggle)} className="profile-btn">
                <img className="profile-img" src={user?.avatar || './player1.jpeg'} alt=""/>
              </button>
              {profileToggle && (
                <div className="profile-dropdown">
                  <button className="dropdown-elements" onClick={() => {
                    navigate('profile')
                  }}>profile</button>
                  <button onClick={() => {
                  navigate('settings')
                  }} className="dropdown-elements" >settings</button>

                  <button onClick={handleLogout} 
                  className="dropdown-elements" >Logout</button>
                </div>
                )
              }  
            </div>
          </div>
        </div>
    );
} export default DashboardNavbar;



