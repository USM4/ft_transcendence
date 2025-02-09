import React, { useContext, useEffect, useRef, useState } from "react";
import anonymous from "../../public/anonyme.png"
import Swal from "sweetalert2";
import { FriendDataContext } from "./FriendDataContext.jsx";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Search, Bell, User } from "lucide-react";
import NotificationsToggle from "./NotificationsToggle.jsx";
import { UserDataContext } from "./UserDataContext.jsx";
import "../App.css";

function DashboardNavbar() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(UserDataContext);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const [searchToggle, setSearchToggle] = useState(false);


  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    try {
      const host=import.meta.env.VITE_HOST_URL;
      const response = await fetch(`${host}/auth/search/${e.target.value}`);
      const results = await response.json();
      setSearchResults(results);
      setSearchToggle(true);
    } catch (error) {
      setSearchResults(null);
      setSearchToggle(false);
      console.error('Error fetching search results:', error);
    }
  };

  const handleLogout = async () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this !?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
        confirmButtonColor: '#28a745',
        cancelButtonText: "No, cancel",
        cancelButtonColor: 'red',
        background: '#000',
        color: '#fff',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const host=import.meta.env.VITE_HOST_URL;
            const response = await fetch(`${host}/auth/logout/`, {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileToggle(false);
        setSearchToggle(false);
        setShowNotification(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-navbar">
      <div className="search-btn">
        <div className="search-input">
          <input placeholder="Search" value={search} onChange={handleSearch} />
          <button className="search-icon">
            <Search color= "white"/>
          </button>
          {searchToggle && searchResults.length > 0 && (
            <div className="search-results" ref={dropdownRef}>
              {searchResults.map((result) => (
                <div key={result.id}>
                  <Link
                    to={`/dashboard/profile/${result.username}`}
                    className="search-result"
                    onClick={() => {
                      setSearchToggle(false);
                      setSearch("");
                    }}
                  >
                    <img
                      className="search-result-img"
                      src={result.avatar}
                      alt=""
                    />
                    <p className="search-result-username" key={result.id}>
                      {result.username}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="notification-and-profile">
        <div className="notification">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="notification-icon"
          >
            <div className="notification-icon-wrapper">
              <Bell
                size={20}
                color="white"
              />
            </div>
          </button>
          {showNotification && (
            <div className="notifications-container" ref={dropdownRef}>
              <NotificationsToggle displayNotification={showNotification} />
            </div>
          )}
        </div>
        <div className="profile" ref={dropdownRef}>
          <button
            onClick={() => setProfileToggle(!profileToggle)}
            className="profile-btn"
          >
            <img
              className="profile-img"
              src={user?.avatar || anonymous}
              alt=""
            />
          </button>
          {profileToggle && (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button
                className="dropdown-elements"
                onClick={() => {
                  navigate(`/dashboard/profile/${user.username}`);
                }}
              >
                profile
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard/settings");
                }}
                className="dropdown-elements"
              >
                settings
              </button>

              <button onClick={handleLogout} className="dropdown-elements">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DashboardNavbar;
