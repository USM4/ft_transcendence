// import React from "react";
// import SideBar from "./SideBar.jsx";

// function Dashboard() {

//     return (
//         <div className="dashboard">
//             {/* <SideBar/> */}
//         </div>
//     )
// }
// export default Dashboard;
import React from 'react';
import '../App.css'; // Assuming you are using a CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome to the Dashboard</h1>
        <p>This is your main content area.</p>
      </div>
    </div>
  );
};

export default Dashboard;
