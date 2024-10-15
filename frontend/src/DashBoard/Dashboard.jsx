import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import DashboardNavbar from "./DashboardNavbar.jsx";
import MatchHistory from "./MatchHistory.jsx";
import DashboardFriends from "./DashboardFriends.jsx";
import Leaderboard from "./Leaderboard.jsx";
import NotificationsToggle from "./NotificationsToggle.jsx";
import DashboardChart from "./DashboardChart.jsx";
import DashboardDoghnuts from "./DashboardDoghnuts.jsx";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";

function Dashboard(params) {
    return(    
        <div className="dashboard-components">
        <div className="dashboard-stats">
            <div className="stats-graph">
                <div className="stats-graph-title"><p>Player Statistics</p></div>
                <div className="dashboard-chart"><DashboardChart/></div>
            </div>
        <div className="wins-ratio">
            <div className="doghnuts-container"><DashboardDoghnuts/></div>
            <div className="leaderboard-container">
            <div className="leaderboard-title"><p>Leaderboard</p></div>
            <div className="leaderboard-subcomponent">
                <Leaderboard/>
                <Leaderboard/>
                <Leaderboard/>
                <Leaderboard/>
            </div>
            </div>
        </div>
        </div>
        <div className="right-side-dashboard">
            <div className="match-history">
            <p> Match History </p> 
            <div className="match-history-container">
                <MatchHistory/>
                <MatchHistory/>
                <MatchHistory/>
                <MatchHistory/>
            </div>
            </div>
            <div className="dashboard-friends">
            <p className="dashboard-friends-title">Online Friends</p> 
            <div className="friends-container">
                <DashboardFriends/>
                <DashboardFriends/>
                <DashboardFriends/>
                <DashboardFriends/>
                <DashboardFriends/>
            </div>
            </div>
        </div>
        </div>
    )
}
export default Dashboard;

