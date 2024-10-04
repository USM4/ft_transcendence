import React from "react";
import './Dashboard.css'
import HomeIcon from '@mui/icons-material/Home'
import SendIcon from '@mui/icons-material/Send';
import GamepadIcon from '@mui/icons-material/Gamepad';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function SideBar() {
    const SideBarData = [
        {
            title: "Home",
            icon: <HomeIcon/>,
            link: "/home"
        },
        {
            title: "Chat",
            icon: <SendIcon/>,
            link: "/chat"
        },
        {
            title: "Game",
            icon: <GamepadIcon/>,
            link: "/game"
        },
        {
            title: "Friends",
            icon: <PeopleAltIcon/>,
            link: "/friends"
        },
    ]
    return (
        <div className="SideBar">
            <p>hahhahahahhahahahaha</p>
            <ul>
                {SideBarData.map((key, value) => {
                return(
                    <li key={key} onClick={() => {window.location.pathname = value.link}}> 
                    {" "}
                    <div>{value.icon}</div> {" "}
                    <div> 
                        {value.title}
                    </div>
                    </li>
                );
                })}
            </ul>
        </div>

    );
}
export default SideBar;