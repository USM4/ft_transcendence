import React from "react";
import SmsIcon from '@mui/icons-material/Sms';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import skull from "../../public/skull.jpeg"

function ProfileFriendList() {

    return(
        <div className="profile-friend-item">
            <div className="profile-friend-info">
                <img src={skull} alt=""/>
                <p> Oussama Redoine </p>
            </div>
            <div className="dm-friend">
                <button className="invite-btn"><SmsIcon/></button>
                <button className="invite-btn"><SportsKabaddiIcon/></button>
            </div>
        </div>
    );
    
}
export default ProfileFriendList;