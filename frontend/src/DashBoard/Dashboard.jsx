import React from "react";
import SideBar from "./SideBar.jsx";

function Dashboard() {

    return (
      <div className="dashboard-container">
          <div>
              <SideBar/>
          </div>
          <div className="dash-navbar">
            <ul >
              <li><button className="nav-btns">notification</button></li>
              <li><button className="nav-btns">search</button></li>
              <li><button className="nav-btns">profile</button></li>
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
