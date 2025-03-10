import React, { useEffect, useState,useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { UserDataContext } from '../DashBoard/UserDataContext.jsx';

const RenderPlayers = ( {onPlayersChange}) => {
  const [isEditing, setIsEditing] = useState(null);
  const { user } = useContext(UserDataContext);
  const [players, setPlayers] = useState([
    { name: user.display_name},
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

  useEffect(() => {
    if (onPlayersChange) {
      onPlayersChange(players);
    }
  }
  , [players, onPlayersChange]);

  return (
    <div className="tournament-players">
      <p>Ready Players!</p>
      {players.map((player, index) => (
        <div key={index} className="player">
          <h3>Player Name:</h3>
          {(isEditing === index && index !== 0) ? (
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
            {index !== 0 && (isEditing === index ? <SaveIcon/> : <EditIcon/>)}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RenderPlayers;