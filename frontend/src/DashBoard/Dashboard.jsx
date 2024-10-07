import React from "react";
import SideBar from "./SideBar.jsx";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import '../App.css'
function Dashboard() {

    return (
      <div className="dashboard-container">
        <div></div>
          <SideBar/>
         <div className="main-dashbord-content">
          <div>
           <h1>Welcome to the Dashboard</h1>
           <p>This is your main content area.</p>
          </div>
         </div>
       </div>
    )
}

export default Dashboard;
