import React, { useContext, useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { SocketContext } from "./SocketContext.jsx";
import Swal from "sweetalert2";

function NotificationsToggle({ displayNotification }) {
  const [notifications, setNotification] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  // const { socket } = useContext(SocketContext);
  const [notif, setNotif] = useState(false);

  const handleNotification = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/notifications/",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNotification(data);
        setNotif(true);
      }
    } catch (error) {
      console.error("Error fetching notification:", error);
      setNotif(false);
    }
  };
  
  const acceptFriendRequest = async (requestId) => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/accept_friend_request/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ request_id: requestId }),
        }
      );
      if (response.ok) {
        setNotification((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== requestId
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are friends now !",
          showConfirmButton: false,
          timer: 1500,
          background: '#000',
          color: '#fff',
        });
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  useEffect(() => {
    handleNotification();
    // console.log("Notification:", notif);
  }, [notif]);

  return (
    <div className="notif-invitation-text">
      {/* {console.log("Current notifications:", notifications)} */}
      <div className="notifications-compo">
        {/* {console.log("length ..................... :", notifications.length)} */}
        {notifications.length === 0 ? (
          <div style={{ color: "white" }}> No Notifications </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification">        
              <div style={{ color: "white" }} className="user-and-msg-invitation">
                {notification.user_from}
                {notification.message}
              </div>
              <div className="notification-accept">
                <button onClick={() => acceptFriendRequest(notification.id)}>
                  <CheckIcon style={{color: 'green'}}/>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default NotificationsToggle;
