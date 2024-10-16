import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import oredoine from '/oredoine.jpeg'

function ProfileSettings(){
    return(
        <div className="settings-component">
            <div className="profile-settings">
                <div className="settings-user-image">
                    <img src={oredoine} alt="" />
                    <p> USM4 </p>
                </div>
                <div className="settings-options">
                    <div className="general-profile-settings"><button >General settings</button></div>
                    <div className="two-fa-settings"><button > Two Factor Settings </button></div>
                </div>
            </div>
            <div className="profile-edit-settings"></div>
        </div>
    );
};
export default ProfileSettings;
