import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import { SocketContext } from "./SocketContext.jsx";
import Swal from "sweetalert2";

function NotificationsToggle({ displayNotification }) {
  const [notifications, setNotification] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notif, setNotif] = useState(false);
  const navigate = useNavigate();

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


  const handleNotificationsSwitch = (notification) => {
    console.log("Notification received:", notification);
    if (notification.notification_type === 'friend_request') {
      acceptFriendRequest(notification.id);
      console.log("friend request accepted");
    } else if (notification.notification_type === 'game_invite') {
      console.log("Game invite accepted----------->", notification);

      navigate('/tournament/options/game/matchMaking', { state: { target: notification.sender_id} })
    }
    setNotification((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== notification.id)
    );
  };

  useEffect(() => {
    handleNotification();
  }, [notif]);

  return (
    <div className="notif-invitation-text">
      <div className="notifications-compo">
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
                <button onClick={() => handleNotificationsSwitch(notification)}>
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