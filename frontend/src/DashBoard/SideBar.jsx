import React from "react";
import '../App.css'
import HomeIcon from '@mui/icons-material/Home'
import SendIcon from '@mui/icons-material/Send';
import GamepadIcon from '@mui/icons-material/Gamepad';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ReorderIcon from '@mui/icons-material/Reorder';
function SideBar() {
    const SideBarData = [
        {
            title: "Home",
            icon: <HomeIcon/>,
            link: "/dashboard"
        },
        {
            title: "Chat",
            icon: <SendIcon/>,
            // chat scoope
            link: "/dashboard"
        },
        {
            title: "Game",
            icon: <GamepadIcon/>,
            // Game scoope
            link: "/dashboard"
        },
        {
            title: "Friends",
            icon: <PeopleAltIcon/>,
            link: "/dashboard"
        },
        {
            title: "Logout",
            icon: <KeyboardReturnIcon/>,
            link: "/"
        },

    ]
    return (
        <div className="SideBar">
            <ul>
                {SideBarData.map((value, key) => {
                return(
                    <li  className="middle-sidebar-icon" key={key} onClick={() => {window.location.pathname = value.link}}>
                        <div>{value.icon}</div>
                    </li>
                );
                })}
            </ul>
        </div>

    );
}
export default SideBar;