import React from "react";
import "../App.css";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ReorderIcon from "@mui/icons-material/Reorder";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const navigate = useNavigate();
  const SideBarData = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/dashboard",
    },
    {
      title: "Chat",
      icon: <SendIcon/>,
      // chat scoope
      link: "/dashboard",
    },
    {
      title: "Game",
      icon: <GamepadIcon />,
      // Game scoope
      link: "/dashboard",
    },
    {
      title: "Profile",
      icon: <PersonOutlineIcon />,
      link: "/dashboard/profile",
    },
  ];
    const handleLogout = async () =>{
    alert('are you sure')
    const response = await fetch( 'http://localhost:8000/auth/logout/',
    {
      method: 'POST',
      credentials: 'include',
    }
    )
    if(response.ok)
    {
      const data = await response.json();
      navigate('/signin')
    }
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
