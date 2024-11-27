import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TournamentRegistration = () => {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="tournament-registration-component">
      <div className="Ping-Pong Tournament Registration">
        <div className="registration-title">
          <div className="return-icon">
            <button
              onClick={() => {
                navigate("/tournament/options");
              }}
            >
              <ArrowBackIcon fontSize="large" />
            </button>
          </div>
          <div className="title-trnmt">
            <p>Ping-Pong Tournament Registration </p>
          </div>
        </div>
        <div className="tournament-players-components">
          <div className="tournament-players">
            {/* <h3>Player Name:</h3>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  /> */}
          </div>
          <div className="tournament-rules-component">
                    {/* <h3>Tournament Rules:</h3>
                    <ul>
                      <li>Players must be available at match time.</li>
                      <li>Players should be more than 3 (3la hasab)</li>
                      <li>10 minutes break between each round.</li>
                    </ul> */}
          </div>
        </div>
      </div>
    </div>
  );  
};

export default TournamentRegistration;
