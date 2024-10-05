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
            title: "List",
            icon: <ReorderIcon/>,
            link: '/dashboard'
        },
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
    const first_icon = SideBarData[0];
    const last_icon = SideBarData[SideBarData.length - 1];
    const middle_icons = SideBarData.slice(1, SideBarData.length - 1)
    return (
        <div className="SideBar">
            <ul>
                <li className="first-sidebar-icon" onClick={() => {window.location.pathname = first_icon.link}}>
                    <div> {first_icon.icon}</div>
                </li>
                {middle_icons.map((value, key) => {
                return(
                    <li  className="middle-sidebar-icon" key={key} onClick={() => {window.location.pathname = value.link}}>
                        <div>{value.icon}</div>
                    </li>
                );
                })}
                <li className="last-sidebar-icon" onClick={() => {window.location.pathname = last_icon.link}}>
                    <div> {last_icon.icon}</div>
                </li>
            </ul>
        </div>

    );
}
export default SideBar;