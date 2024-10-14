import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import MatchHistory from "./MatchHistory.jsx";
import DashboardFriends from "./DashboardFriends.jsx";
import Leaderboard from "./Leaderboard.jsx";
import DashboardChart from "./DashboardChart.jsx";
import DashboardDoghnuts from "./DashboardDoghnuts.jsx";
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
              <img className="profile-img" src="realone.png" />
            </div>
          </div>
        </div>
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
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                  <MatchHistory/>
                </div>
              </div>
              <div className="dashboard-friends">
                <p className="dashboard-friends-title">Friends</p> 
                <div className="friends-container">
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                  <DashboardFriends/>
                </div>
              </div>
          </div>
        </div>
        {/* <Outlet/> */}
      </div>
    </div>
  );
}

export default Dashboard;
