import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge } from '@mui/material';


export default function Chat_header({ selected }) {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    function handleClick() {
        setMenu((prevState) => !prevState);
    }

    function handleBlockClicked() {
        // I STILL DON'T HAVE THE BLOCK STATUS
        // NEED TO CHECK IF I CAN HANDLE IT WITH A REQUEST FROM THE BACK ELSE IT'S GONNA BE AN ARRAY OF NAMES BLOCKED

        {/* this.blocked.push(selected.name)*/ }
    }
    function handleProfileClicked() {
        navigate(`/dashboard/profile/${selected.username}`);
    }
    function handleGameClicked() {
        {/* MUST HANDLE THE GAME INVITATION  BUTTON */ }
    }

    return (
        <div className="chat-header">
            <div className="header-wraper">
                <div className="avatar-header">
                    <Badge 
                        badgeContent=""
                        color="success"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right"}}
                        overlap="circular"
                        >
                    <img sx={{ width: 80, height: 80 }} src={selected.avatar} alt={`${selected.username}'s avatar`} />

                        </Badge>
                </div>
                <div className="header-name">
                    <h2 >{selected.username}</h2>
                </div>
            </div>

            <div className="header-menu">

                <ul onClick={handleClick} >
                    <h1>...</h1>
                    {menu &&
                        <div className="menu-list">
                            <li className="menu-content" onClick={handleBlockClicked}>
                                <h2>⊘ BLOCK</h2>
                            </li>
                            <li className="menu-content" onClick={handleProfileClicked}>
                                <h2>👤 PROFILE</h2>

                            </li>
                            <li className="menu-content" onClick={handleGameClicked}>
                                <h2>🕹️ GAMEINVITE</h2>

                            </li>
                        </div>}
                </ul>
            </div>

        </div>

    );
}