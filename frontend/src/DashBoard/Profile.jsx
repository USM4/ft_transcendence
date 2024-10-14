import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import SideBar from "./SideBar";
import "../App.css";

function Profile() {
    return(
        <div className="profile-component">
            <div className="dashboard-container">
                <SideBar />
                <div className="main-dashbord-content">
                    <DashboardNavbar/>
                </div>
            </div>
            <div className="profile-container">

            </div>
        </div>
        
    )
}
export default Profile;