import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RenderPlayers from './RenderPlayers.jsx';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TournamentRegistration = () => {

  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);

  const handleNext = () => {
      // checking if all players have valid names
      const invalidPlayers = players.filter(player => !player.name.trim());
      if (invalidPlayers.length > 0) {
        toast.error("All players must have valid names!");
        return;
      }
      const uniqueNames = new Set(players.map(player => player.name));
      if (uniqueNames.size !== players.length) {
        toast.error("Invalid names! Names must be unique.");
        return;
      }
      console.log(players[0].name)
      navigate("/tournament/options/play-tournament", { state: players });
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
                  <li>Players must be available at match time.</li>
                  <li>Players should be more than 3 (3la hasab)</li>
                  <li>10 minutes break between each round.</li>
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
