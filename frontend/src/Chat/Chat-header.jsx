import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ChatSocketContext } from './Chat.jsx'
import { useContext } from 'react';
import { Badge } from '@mui/material';

export default function Chat_header({ selected }) {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const socket = useContext(ChatSocketContext);

    function handleClick() {
        setMenu((prevState) => !prevState);
    }

    function handleBlock() {
        console.log('Block Clicked');
        selected.is_blocked = !selected.is_blocked;
        socket.send(
            JSON.stringify({
                type: 'block',
                flag: selected.is_blocked,
                receiver: selected.id,
                message: null,
            })
        )

    }


    function handleBlockClicked() {
        try {
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
            }).then((result) => {
                if (result.isConfirmed) {
                    handleBlock();
                    Swal.fire({
                        title: selected.is_blocked ? 'Blocked!' : 'Unblocked!',
                        text: selected.is_blocked ? 'This user has been blocked successfully' : 'This user has been unblocked successfully',
                        icon: 'success',
                        background: '#000',
                        color: '#fff',
                    })
                }
            })
        }
        catch (error) {
            console.error(error);
        }
    }
    function handleProfileClicked() {
        navigate(`/dashboard/profile/${selected.username}`);
    }
    function handleGameClicked() {
        {/* MUST HANDLE THE GAME INVITATION  BUTTON */ }
        console.log('Game Invite Button Clicked');
    }

    return (
        <div className="chat-header">
            <div className="header-wraper">
                <div className="avatar-header">
                    <Badge
                        color={!selected.is_online ? "error" : "success"}
                        variant="dot"
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
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
                        <div className="menu-list block-box">
                            <li className="menu-content" onClick={handleBlockClicked}>
                                {selected.is_blocked ? <h2>⊘ UNBLOCK</h2> : <h2>⊘ BLOCK</h2>}
                            </li>
                            <li className="menu-content" onClick={handleProfileClicked}>
                                <h2>👤 PROFILE</h2>

                            </li>
                            <li className="menu-content" onClick={!selected.is_blocked ? () => handleGameClicked(selected) : null}>
                                <h2>🕹️ GAMEINVITE</h2>

                            </li>
                        </div>}
                </ul>
            </div>

        </div>

    );
}