import React from "react";

function DashboardFriends() {


    return(
        <div className="dashboard-friend-item">
            <div className="friend-info">
                <img src="player1.jpeg" alt=""/>
                <p> Oussama Redoine </p>
            </div>
            <div className="friend-invite">
                <button className="invite-btn"> invite </button>
            </div>
        </div>
    );
    
}
export default DashboardFriends;