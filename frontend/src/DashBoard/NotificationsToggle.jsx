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
        // useEffect (() => {
        //     handleNotification();
        // }, []);
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
                        </div>
                    ))
                ) : (
                    // <p style={{color: 'black'}}>No new Notifications</p>
                    <></>
                )}
            </div>
        </div>
    );
}
export default NotificationsToggle;