import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RenderPlayers from './RenderPlayers.jsx';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TournamentRegistration = () => {

  function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);

  const handleNext = () => {
      // checking if all players have valid names
      const invalidPlayers = players.filter(player => !player.name.trim());
      if (invalidPlayers.length > 0) {
        toast.error("Players name mustn't be empty!");
        return;
      }
      const longname = players.filter(player => player.name.length > 9);
      if (longname.length > 0) {
        longname.filter(name => toast.error(`Player name must be only 9 caractere: ${name.name}!`));
        return;
      }
      const uniqueNames = new Set(players.map(player => player.name));
      if (uniqueNames.size !== players.length) {
        toast.error("Invalid names! Names must be unique!");
        return;
      }
      setPlayers(shuffleArray(players));
      localStorage.setItem('players', JSON.stringify(players));
      navigate("/tournament/options/play-tournament");
  };
  return (
    <div className="tournament-registration-component">
      <div className="Ping-Pong Tournament Registration">
        <div className="registration-title">
          <div className="return-icon">
            <button
              onClick={() => { navigate("/tournament/options"); }}>
              <ArrowBackIcon fontSize="large" />
            </button>
          </div>
          <div className="title-trnmt">
            <p>Ping-Pong Tournament Registration </p>
          </div>
        </div>
        <div className="tournament-players-components">
          <RenderPlayers onPlayersChange={setPlayers}/>
            <div className="tournament-rules">
                <WarningAmberIcon fontSize="large" style={{color: 'yellow'}}/>
                <h3>Tournament Rules:</h3>
                <ul>
                  <li>Proposing Tournament must be irl</li>
                  <li>Players must be available at match time.</li>
                  <li>Click on (Start The Party 🔥) Button to Start each match </li>
                </ul>
                <div className="next-to-trnmt">
                  <button
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );  
};

export default TournamentRegistration;
