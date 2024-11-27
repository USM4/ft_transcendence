import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const RenderPlayers = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [players, setPlayers] = useState([
    { name: "Player_1" },
    { name: "Player_2" },
    { name: "Player_3" },
    { name: "Player_4" },
    { name: "Player_5" },
    { name: "Player_6" },
    { name: "Player_7" },
    { name: "Player_8" },
  ]);

  const handleNameChange = (index, newName) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = newName;
    setPlayers(updatedPlayers);
  };

  return (
    <div className="tournament-players">
      <p>Ready Players!</p>
      {players.map((player, index) => (
        <div key={index} className="player">
          <h3>Player Name:</h3>
          {isEditing === index ? (
            <input
              type="text"
              value={player.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              onBlur={() => setIsEditing(null)}
              autoFocus
            />
          ) : (
            <span onClick={() => setIsEditing(index)}>
              {player.name}
            </span>
          )}
          <button onClick={() => setIsEditing(isEditing === index ? null : index)}>
            {isEditing === index ? <SaveIcon/> : <EditIcon/>}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RenderPlayers;