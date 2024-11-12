import React, { useState } from 'react';


export default function Chat_header({ selected }) {
    const [menu, setMenu] = useState(false);

    function handleClick() {
        setMenu((prevState) => !prevState);
    }

    function handleBlockClicked() {
        console.log("CLICKED")
    }
    function handleProfileClicked() {
        console.log("CLIC")
    }
    function handleGameClicked() {
        console.log("C")
    }

    return (
        <div className="chat-header">
            <div className="header-wraper">
                <div className="avatar-header">
                    <img src={selected.avatar} alt={`${selected.name}'s avatar`} />
                </div>
                <div className="header-name">
                    <h2 >{selected.name}</h2>
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