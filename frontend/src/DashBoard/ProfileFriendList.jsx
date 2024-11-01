import React, { useState } from "react";
import SmsIcon from '@mui/icons-material/Sms';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import skull from "../../public/skull.jpeg"

function ProfileFriendList({username , avatar}) {
    return(
        <div className="profile-friend-item">
            <div className="profile-friend-info">
                <img src={avatar} alt=""/>
                <p> {username} </p>
            </div>
            <div className="dm-friend">
                <button className="invite-btn"><SmsIcon/></button>
                <button className="invite-btn"><SportsKabaddiIcon/></button>
            </div>
        </div>
    );
    
}
export default ProfileFriendList;