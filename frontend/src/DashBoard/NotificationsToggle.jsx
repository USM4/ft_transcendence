import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext.jsx";

function NotificationsToggle({ displayNotification }) {
  const [notifications, setNotification] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const { socket } = useContext(SocketContext);
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

  useEffect(() => {
    // Ensure the socket is open and ready to receive messages
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Define the onmessage handler inside the useEffect hook to listen for incoming messages
      socket.onmessage = (event) => {
        try {
          let data = JSON.parse(event.data);
          let type = data.type;
          let message = data.message;
          const notification = JSON.parse(event.data);
          console.log("Notification received:", notification);
          setNotification((prevNotifications) => [
            ...prevNotifications,
            notification,
          ]);
          if (type === "receive_notification") {
            setNotification((prevNotifications) => [
              ...prevNotifications,
              message.from_user,
            ]);
          }
        } catch (error) {
          console.error("Error parsing notification:", error);
        }
      };
    }
  }, [socket]);

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
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  useEffect(() => {
    handleNotification();
    console.log("Notification:", notif);
  }, [notif]);

  return (
    <div className="notif-invitation-text">
      {console.log("Current notifications:", notifications)}
      <div>
        {notifications.length === 0 ? (
          <div style={{ color: "white" }}> No Notifications </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification">
              <div style={{ color: "white" }}>
                {notification.user_from} sent a friend request{" "}
                {notification.message}
              </div>
              <div className="notification-accept">
                <button onClick={() => acceptFriendRequest(notification.id)}>
                  Accept
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
