import React from "react";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

function DashboardFriends() {


    return(
        <div className="dashboard-friend-item">
            <div className="friend-info">
                <img src="skull.jpeg" alt=""/>
                <p> Oussama Redoine </p>
            </div>
            <div className="friend-invite">
                <button className="invite-btn"><SportsKabaddiIcon/></button>
            </div>
        </div>
    );
    
}
export default DashboardFriends;