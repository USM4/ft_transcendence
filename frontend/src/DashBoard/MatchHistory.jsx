import React from "react";
import skull from '../../public/skull.jpeg'


function MatchHistory() {

    return(
        <div className="match-history-item">
            <img src={skull} className="img-user1"/>
            <div className="match-history-score">
                1 - 7
            </div>
            <img src="./oredoine.jpeg" className="img-user2"/>
        </div>
    );
    
};

export default MatchHistory;