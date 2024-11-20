import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext.jsx";

function NotificationsToggle({displayNotification}) {
  const [notifications, setNotification] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const {socket} = useContext(SocketContext);
  const [notif, setNotif] = useState(false);

  // const handleNotification = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/auth/notifications/",
  //       {
  //         method: "GET",
  //         credentials: "include",
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setNotification(data);
  //       setNotif(true);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching notification:", error);
  //     setNotif(false);
  //   }
  // };

  useEffect(() => {
    if (socket.readyState === WebSocket.OPEN) {
        try {
            console.log("Socket is open");
            // const notification = JSON.parse(socket.data);
            // console.log("Notification received:", notification);
            // setNotification((prevNotifications) => [
            //     ...prevNotifications,
            //     notification,
            // ]);
        } catch (error) {
            console.error("Error parsing notification:", error);
        }
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

  // useEffect(() => {
  //   handleNotification();
  //   console.log("Notification:", notif);
  // }, [notif]);
  return (
    <div className="notif-invitation-text">
      {
        console.log("Current notifications:", notifications)
      }
      <div>
        {notifications.length === 0 ? (
          <div style={{ color: "white" }}> No Notifications </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification">
              <div style={{ color: "white" }}>{notification.message}</div>
              <div className="notification-accept">
                {" "}
                <button onClick={() => acceptFriendRequest(notification.id)}>
                  {" "}
                  Accept{" "}
                </button>{" "}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default NotificationsToggle;
