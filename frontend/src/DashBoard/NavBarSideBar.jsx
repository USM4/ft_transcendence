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
import DashboardBody from "./Dashboard.jsx";
import "../App.css";

function NavbarSideBar() {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-dashbord-content">
        {/* <DashboardNavbar/> */}
        <Outlet/>
      </div>
    </div>
  );
}

export default NavbarSideBar;
