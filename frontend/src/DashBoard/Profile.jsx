import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

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
import skull from "../../public/skull.jpeg";
import player from "../../public/player1.jpeg";
import "../App.css";
import ProfileBarChart from "./ProfileBarChart.jsx";
import ProfileRadar from "./ProfileRadar.jsx";
import { UserDataContext } from './UserDataContext.jsx'
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileMatchHistory from "./ProfileMatchHistory.jsx";

function Profile() {
  const {user} = useContext(UserDataContext);
  const navigate = useNavigate();
  const [stranger,setStranger] = useState(false)
  return (
    <div className="profile-component">
      <div className="top-side-prfl">
        <div className="profile-img-name">
          <img src={user?.avatar || player} alt=""/>
          <div className="profile-infos">
            <div className="profile-name"> {user.username}</div>
            <div className="profile-bio">ag1hegoat is the greatest man a live, the king , the only</div>
          </div>
        </div>
        {stranger ? (
          <div className="add-friend-btn">
            <button>Add friend</button>
          </div>

        ) :
        (
          <div className="profile-settings-icon">
            <button onClick={() => navigate('/dashboard/settings')}>
              <SettingsIcon fontSize="large"/>
            </button>          
          </div>
        )
      }
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
