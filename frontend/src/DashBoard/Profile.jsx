import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import SideBar from "./SideBar";
import ProfileFriendList from "./ProfileFriendList.jsx"
import oredoine from "../../public/oredoine.jpeg";
import "../App.css";
import ProfileBarChart from "./ProfileBarChart.jsx";
import ProfileRadar from "./ProfileRadar.jsx";
import ProfileMatchHistory from "./ProfileMatchHistory.jsx";

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
            <div className="friends-list-title">Friends List</div>
            <div className="prfl-friend-list-container">
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
                <ProfileFriendList/>
            </div>
        </div>
        <div className="right-prfl-component">
            <div className="prfl-chart">
                <div className="prfl-chart-title"> Statistics </div>
                <div className="profile-barchart"> <ProfileBarChart/></div>
            </div>
            <div className="history-and-radar">
                <div className="prfl-match-history"> 
                  <div className="prfl-history-title"> Match History </div>
                  <div className="prfl-match-history-results">
                    <ProfileMatchHistory/>
                    <ProfileMatchHistory/>
                    <ProfileMatchHistory/>
                    <ProfileMatchHistory/>
                    <ProfileMatchHistory/>
                    <ProfileMatchHistory/>
                  </div>
                </div>
                <div className="prfl-radar">
                  <div className="prfl-radar-title"> Skills </div>
                  <div className="prfl-radar-component">
                    <ProfileRadar/>
                  </div>
                </div>
            </div>
        </div>
      </div>
        
    </div>
  );
}
export default Profile;
