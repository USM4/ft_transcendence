import React from "react";
import SideBar from "./SideBar.jsx";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import '../App.css'
function Dashboard() {

    return (
      <div className="dashboard-container">
          <div>
              <SideBar/>
          </div>
          <div className="dash-navbar">
            <ul >
              <li><button className="nav-btns">Notifications</button></li>
              {/* <li><div className="nav-icons"><NotificationsIcon/></div></li> */}
              <li><button className="nav-btns">Search</button></li>
              {/* <li><div className="nav-icons"><SearchIcon/></div></li> */}
              <li><button className="nav-btns">Profile</button></li>
              {/* <li><div className="nav-icons"><PermIdentityIcon/></div></li> */}
            </ul>
          </div> 
         <div className="main-dashbord-content">
           <h1>Welcome to the Dashboard</h1>
           <p>This is your main content area.</p>
         </div>
       </div>
    )
}

export default Dashboard;
