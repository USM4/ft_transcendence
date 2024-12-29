import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ChatSocketContext } from './Chat.jsx'
import { useContext } from 'react';
import { Badge } from '@mui/material';
import toast from 'react-hot-toast';

export default function Chat_header({ selected }) {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const socket = useContext(ChatSocketContext);

    function handleClick() {
        setMenu((prevState) => !prevState);
    }

    function handleBlock() {
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

    const handleGameClicked = async () => {
        console.log("invite selected to game", selected.username);
        const response = await fetch("https://localhost:443/auth/game_invite/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                to_user: selected.id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(data.message);
            navigate("/tournament/options/game/matchMaking", {state: { type: "game_invite", opponent: selected.username}});
        }
        else {
            toast.error(data.error);
        }
    }

    return (
        <div className="chat-header">
            <div className="header-wraper">
                <div className="avatar-header">
                    <Badge
					sx={{
						'& .MuiBadge-dot': {
							backgroundColor: selected.is_online ? '#00ff00' : '#ff0000',
						},
					}}
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
                                {selected.is_blocked ? (selected.blocker !== selected.username ? <h2>⊘ UNBLOCK</h2> : null) : <h2>⊘ BLOCK</h2>}
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