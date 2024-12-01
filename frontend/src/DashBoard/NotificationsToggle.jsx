import React, { useContext, useEffect, useState } from "react";
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

  // useEffect(() => {
  //   if (socket)
  //     console.log("reaady state ----------> ", socket.readyState);
  //   else
  //     console.log("socket is null");
  // }, [socket]);

  // useEffect(() => {
  //   // Ensure the socket is open and ready to receive messages
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     // Define the onmessage handler inside the useEffect hook to listen for incoming messages
  //     socket.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         const type = data.type;
  //         const message = data.message;
  //         console.log("Notification received:", data);
  //         setNotification((prevNotifications) => [
  //           ...prevNotifications,
  //           message,
  //         ]);
  //         console.log("Notification:", message.from_user);
  //       } catch (error) {
  //         console.error("Error parsing notification:", error);
  //       }
  //     };
  //   }
  // }, [socket]);

  // useEffect(() => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         console.log("Notification received:", data);
  //         if (data.type === 'receive_notification'){
  //           setNotification((prevNotifications) => [
  //             ...prevNotifications,
  //             data.message,
  //           ]);
  //         }
  //       } catch (error) {
  //         console.error('Error parsing notification:', error);
  //       }
  //     };
  //   }
  // }, [socket]);
  
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
          title: "Your are now friends",
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
    console.log("Notification:", notif);
  }, [notif]);

  return (
    <div className="notif-invitation-text">
      {console.log("Current notifications:", notifications)}
      <div>
        {console.log("length ..................... :", notifications.length)}
        {notifications.length === 0 ? (
          <div style={{ color: "white" }}> No Notifications </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification">        
              <div style={{ color: "white" }}>
                {notification.user_from}
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
