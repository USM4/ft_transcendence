import React, { useContext } from "react";
import "../App.css";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PersonIcon from '@mui/icons-material/Person';
import ReorderIcon from "@mui/icons-material/Reorder";
import TextsmsIcon from '@mui/icons-material/Textsms';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function SideBar({username}) {
  const navigate = useNavigate();
  const SideBarData = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/dashboard",
    },
    {
      title: "Chat",
      icon: <TextsmsIcon/>,
      // chat scoope
      link: "/chat",
    },
    {
      title: "Game",
      icon: <GamepadIcon />,
      // Game scoope
      link: "/tournament/options",
    },
    {
      title: "Profile",
      icon: <PersonIcon />,
      link: `/dashboard/profile/${username}`,
    },
  ];
      const handleLogout = async () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this !?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
        confirmButtonColor: '#28a745',
        cancelButtonText: "No, cancel",
        cancelButtonColor: '#dc3545',
        background: '#000',
        color: '#fff',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch("https://localhost:443/auth/logout/", {
              method: "POST",
              credentials: "include",
            });
            if (response.ok) navigate("/signin");
          } catch (error) {
            console.error("Error logging out :", error);
          }
        }
      });
    }
  const logout = {
    title: "Logout",
    icon: <KeyboardReturnIcon />,
    link: "/",
  };
  return (
    <div className="SideBar">
      <ul>
        {SideBarData.map((value, key) => {
          return (
            <li
              className={`middle-sidebar-icon-${value.title}`}
              key={key}
              // onClick={() => {
              //   window.location.pathname = value.link;
              // }}
              onClick={() => {
                navigate(value.link);
              }}
        
            >
              <div>{value.icon}</div>
            </li>
          );
        })}
      </ul>
      <div className="logout-icon-container">
        <div
          className={`middle-sidebar-icon-${logout.title}`}
          onClick={ handleLogout }
        >
          <div className="logout-icon">{logout.icon}</div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
