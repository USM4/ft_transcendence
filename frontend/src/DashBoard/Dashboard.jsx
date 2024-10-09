import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";
function Dashboard() {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-dashbord-content">
        <div className="dashboard-navbar">
          <div className="search-btn">
            <input className="search-input" placeholder="Search" />
            <button className="search-icon">
              <SearchIcon />
            </button>
          </div>
          <div className="notification-and-profile">
            <div className="notification">
              <button className="notification-icon">
                <NotificationsIcon />
              </button>
            </div>
            <div className="profile">
              <div className="profile-img"><img src="realone.png"/></div>
            </div>
          </div>
        </div>

        {/* <Outlet/> */}
      </div>
    </div>
  );
}

export default Dashboard;
