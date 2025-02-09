import React, { useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  House,
  MessageCircleHeart,
  Gamepad,
  PersonStanding,
  CornerDownLeft,
} from "lucide-react";
function SideBar({username}) {
  const navigate = useNavigate();
  const SideBarData = [
    {
      title: "Home",
      icon: <House color = "white" size={30} />,
      link: "/dashboard",
    },
    {
      title: "Chat",
      icon: <MessageCircleHeart color = "white" size={30} />,
      // chat scoope
      link: "/chat",
    },
    {
      title: "Game",
      icon: <Gamepad color = "white" size={30} />,
      // Game scoope
      link: "/tournament/options",
    },
    {
      title: "Profile",
      icon: <PersonStanding color = "white" size={30} />,
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
            const response = await fetch("http://localhost:8000/auth/logout/", {
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
    icon: <CornerDownLeft color="white"/>,
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
