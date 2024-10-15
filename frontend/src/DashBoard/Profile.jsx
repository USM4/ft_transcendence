import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import SideBar from "./SideBar";
import oredoine from "../../public/oredoine.jpeg";
import "../App.css";

function Profile() {
  return (
    <div className="profile-component">
      <div className="top-side-prfl">
        <div className="profile-img-name">
          <img src={oredoine} alt="" />
          <div className="profile-infos">
            <div className="profile-name"> Oussama Redoine</div>
            <div className="profile-bio">ag1hegoat is the greatest man a live, the king , the only</div>
          </div>
        </div>
        <div className="add-friend-btn">
          <button>Add friend</button>
        </div>
      </div>
      <div className="bottom-side-prfl">
        <div className="left-prfl-component">
        </div>
        <div className="right-prfl-component">
        </div>
      </div>
        
    </div>
  );
}
export default Profile;
