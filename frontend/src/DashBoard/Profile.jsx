import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardNavbar from "./DashboardNavbar";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import SideBar from "./SideBar";
import ProfileFriendList from "./ProfileFriendList.jsx";
import oredoine from "../../public/oredoine.jpeg";
import skull from "../../public/skull.jpeg";
import player from "../../public/player1.jpeg";
import "../App.css";
import ProfileBarChart from "./ProfileBarChart.jsx";
import ProfileRadar from "./ProfileRadar.jsx";
import { UserDataContext } from "./UserDataContext.jsx";
import { FriendDataContext } from "./FriendDataContext.jsx";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileMatchHistory from "./ProfileMatchHistory.jsx";
import { SocketContext } from "./SocketContext.jsx";
import toast from "react-hot-toast";
function Profile() {

  const {socket} = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const [stranger_data, setStrangerData] = useState(null);
  const navigate = useNavigate();
  const [stranger, setStranger] = useState(false);
  const { friends, setFriends } = useContext(FriendDataContext);
  const { username } = useParams();

  console.log("----------------------SALAAAAMO3ALIKOM----------------------------")
  // console.log("HADA RAH L USR", user.username);
  // if (!user) {
  //   return <div>Loading...</div>;
  // }
console.log("USER IS:", user)
  useEffect(() => {
    if(socket === null) return;
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("data", data);
      if (data.type === "friend_request_accepted") {
        setFriends((prevFriends) => [...prevFriends, data.friend]);
      }
    }
  }, [socket]);

  const sendFriendRequest = async (to_user) => {
    const response = await fetch(
      "http://localhost:8000/auth/send_friend_request/",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to_user: to_user }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      setStrangerData((prevData) => ({
        ...prevData,
        friendship_status: "pending",
      }));
    } else toast.error(data.error);
  };

  const getButtonText = () => {
    if (switchUser.friendship_status === "pending") return "Pending";
    else if (switchUser.friendship_status === "friends") return "Remove Friend";
    else return "Add Friend";
  };

  const removeFriend = async (to_user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove friend !?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      confirmButtonColor: "#28a745",
      cancelButtonText: "No, cancel",
      cancelButtonColor: "#dc3545",
      background: "#000",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          "http://localhost:8000/auth/remove_friend/",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ friend_id: to_user }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          setStrangerData((prevData) => ({
            ...prevData,
            friendship_status: "not_friend",
          }));
        } else toast.error(data.error);
      }
    });
  };
  const handleFriendShip = async () => {
    if (switchUser.friendship_status === "friends")
      await removeFriend(switchUser.id);
    else if (switchUser.friendship_status === "pending")
      toast.error("Friendship request already sent");
    else sendFriendRequest(switchUser.id);
  };

  useEffect(() => {
    if (username !== user.username) {
      const fetchStranger = async () => {
        const response = await fetch(
          `http://localhost:8000/auth/profile/${username}/`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setStranger(true);
          setStrangerData(data);
          console.log("stranger-------->", data);
        } else {
          setStranger(false);
          navigate("/dashboard");
          toast.error("User not found");
          return;
        }
      };
      getButtonText();
      fetchStranger();
    } else {
      setStranger(false);
    }
  }, [username, user.username]);
  const switchUser = stranger ? stranger_data : user;
  console.log("switchUser", switchUser.is_online);
  return (
    <div className="profile-component">
      <div className="top-side-prfl">
        <div className="profile-img-name">
          <img src={switchUser?.avatar || player} alt="" />
          <div className="profile-infos">
            <div className="profile-name"> {switchUser.username}</div>
            <div className="profile-bio">
              ag1hegoat is the greatest man a live, the king , the only
            </div>
          </div>
        </div>
        {stranger ? (
          <div className="add-friend-btn">
            <button onClick={handleFriendShip}>{getButtonText()}</button>
          </div>
        ) : (
          <div className="profile-settings-icon">
            <button onClick={() => navigate("/dashboard/settings")}>
              <SettingsIcon fontSize="large" />
            </button>
          </div>
        )}
      </div>
      <div className="bottom-side-prfl">
        {!stranger ? (
          <div className="left-prfl-component">
            <div className="friends-list-title">Friends List</div>
            <div className="prfl-friend-list-container">
              {!stranger && friends && friends.length > 0 ? (
                friends.map((friend) => (
                  <ProfileFriendList
                    key={friend.id}
                    id={friend.id}
                    username={friend.username}
                    avatar={friend.avatar}
                  />
                ))
              ) : (
                <p>No friends yet</p>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="right-prfl-component">
          <div className="prfl-chart">
            <div className="prfl-chart-title"> Statistics </div>
            <div className="profile-barchart">
              {" "}
              <ProfileBarChart />{" "}
            </div>
          </div>
          <div className="history-and-radar">
            <div className="prfl-match-history">
              <div className="prfl-history-title">
                <p>Match History</p>
                <div className="prfl-match-history-results">
                  <ProfileMatchHistory />
                </div>
              </div>
            </div>
            <div className="prfl-radar">
              <div className="prfl-radar-title">Skills</div>
              <div className="prfl-radar-component">
                <ProfileRadar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
