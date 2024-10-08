import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css'
function Dashboard() {

    return (
      <div className="dashboard-container">
          <SideBar/>
         <div className="main-dashbord-content">
            <div className="search-bar-div">
              <input className="search-bar" placeholder="Search"></input>
              <div className="search-icon"><button className="search-btn"><SearchIcon fontSize="large"/></button></div>
              <div className="notification-div"><button className="notification-btn"><NotificationsIcon fontSize="large"/></button></div>
              <div className="nav-img"> <a><img className="profile-img" src="./realone.png"></img></a></div>
            </div>
            {/* <div className="dashboard-body">
             <h1>Welcome to the Dashboard</h1>
             <p>This is your main content area.</p>
            </div> */}
            {/* <Outlet/> */}
         </div>
       </div>
    )
}

export default Dashboard;
