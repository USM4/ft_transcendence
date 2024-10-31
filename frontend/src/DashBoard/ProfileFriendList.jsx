import React, { useState } from "react";
import SmsIcon from '@mui/icons-material/Sms';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import skull from "../../public/skull.jpeg"

function ProfileFriendList() {
    const [friend,setFriend] = useState([]);
    const fetchFriendList = async () => {
        const response = await fetch('http://localhost:8000/auth/friends/',
        {
            method: 'GET',
            credentials: 'include',
        })
        if(response.ok)
        {
            const data = await response.json();
            setFriend(data);
            console.log(data);
        }
        else
        {
            console.log('something went wrong');
        
        }
    }
    return(
        <div className="profile-friend-item">
            <div className="profile-friend-info">
                <img src={skull} alt=""/>
                <p> Oussama redoine </p>
            </div>
            <div className="dm-friend">
                <button className="invite-btn"><SmsIcon/></button>
                <button className="invite-btn"><SportsKabaddiIcon/></button>
            </div>
        </div>
    );
    
}
export default ProfileFriendList;