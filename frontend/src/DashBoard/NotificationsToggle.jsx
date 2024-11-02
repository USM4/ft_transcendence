import React, { useEffect, useState } from "react";

function NotificationsToggle() {
    const [Notifications,setNotification] = useState([])

    const handleNotification = async () => {
        try {
            const response = await fetch( 'http://localhost:8000/auth/notifications/',
            {
              method: 'GET',
              credentials: 'include',
            })
            if(response.ok)
            {
                const data  = await response.json();
                setNotification(data);
            }
        } catch (error) {
            console.error('Error fetching notification:', error);
        }
    }
    
    const acceptFriendRequest = async (requestId) =>{
        try {
            const response = await fetch('http://localhost:8000/auth/accept_friend_request/',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({request_id: requestId }),
            })
            if(response.ok)
            {
                    setNotification((prevNotifications) =>
                    prevNotifications.filter(notification => notification.id !== requestId)
                    
                );
                alert('Friend Request Accepted successfully!');
            }
        } catch (error) {

        }
    }

    return (
        <div className="notif-invitation-text">
            <button onClick={handleNotification}>
                Show Notifications
            </button>
            <div >
                {
                    Notifications.map((notification) => (
                        <div key={notification.id} className="notification" >
                            <div style={{color: 'white'}}>{notification.message}</div>
                            <div className="notification-accept"> <button  onClick={() => acceptFriendRequest(notification.id)}> Accept </button> </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default NotificationsToggle;