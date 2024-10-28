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
    const acceptFriendRequest = async () =>{
        try {
            const response = await fetch('http://localhost:8000/auth/accept_friend_request/',
            {
                method: 'POST',
                credentials: 'include',
            })
            if(response.ok)
            {
                
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
                {Notifications.length ? (
                    Notifications.map((notification) => (
                        <div key={notification.id} className="notification" >
                            <div style={{color: 'black'}}>{notification.message}</div>
                            <button onClick={acceptFriendRequest}> Accept </button>
                        </div>
                    ))
                ) : (
                    <></>
                    // <p style={{color: 'black'}}>No new Notifications</p>
                )}
            </div>
        </div>
    );
}
export default NotificationsToggle;