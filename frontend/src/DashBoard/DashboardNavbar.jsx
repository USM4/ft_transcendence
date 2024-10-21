import React, { useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsToggle from "./NotificationsToggle.jsx";
import SearchIcon from "@mui/icons-material/Search";
import oredoine from "../../public/oredoine.jpeg";
import hamster from "../../public/hamster.png";
import '../App.css'

function DashboardNavbar() {
    const navigate = useNavigate()
    const [showNotification, setShowNotification] = useState(false)
    const [profileToggle, setprofileToggle] = useState(false)
    const [user, setUser] = useState(null)
    useEffect(() => {
      const getData = async () =>{
        try {
          const response = await fetch('http://localhost:8000/auth/profile/',
            {
              method: 'GET',
              credentials: 'include',
            }
          )
          if(response.ok)
          {
            const data = await response.json();
            setUser(data)
            console.log(user.avatar);
          }
          else
            console.error('error getting data ');          
          
        } catch (error) {
            console.error('error getting data :', error);          
        }
        
      }
      getData();
    }, []);
    if(user === null)
      return <div> fetching user data .. </div>
    const handleLogout = async () =>{
      try {
          const response = await fetch( 'http://localhost:8000/auth/logout/',
          {
            method: 'POST',
            credentials: 'include',
          }
          )
          if(response.ok)
          {
            const data = await response.json();
            navigate('/signin')
          }  
      } catch (error) {
        console.error('Error logging out :', error);
      }
    }

    
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
            <button onClick={() => setprofileToggle(!profileToggle)} className="profile-btn">
                <img className="profile-img" src={user.avatar} />
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



