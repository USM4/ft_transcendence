import React from "react";
import DetailsIcon from '@mui/icons-material/Details';
import skull from '/skull.jpeg'
import oredoine from '/oredoine.jpeg'


function ProfileMatchHistory() {

    return(
        <div className="profile-match-history-item">
            <div className="profile-score-collection">
                <img src={skull}/>
                <div className="profile-match-history-score">
                    1 - 7
                </div>
            </div>
            <div className="details-icon">
                <img src={oredoine}/>
                <button ><DetailsIcon/></button>
            </div>
        </div>
    );
    
};

export default ProfileMatchHistory;