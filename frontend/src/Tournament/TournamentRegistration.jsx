import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RenderPlayers from './RenderPlayers.jsx';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TournamentRegistration = () => {

  const navigate = useNavigate();

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
          <RenderPlayers/>
            <div className="tournament-rules">
                <WarningAmberIcon />
                <h3>Tournament Rules:</h3>
                <ul>
                  <li>Players must be available at match time.</li>
                  <li>Players should be more than 3 (3la hasab)</li>
                  <li>10 minutes break between each round.</li>
                </ul>
                <div className="next-to-trnmt">
                  <button
                    onClick={() => {
                      navigate("/tournament/options/play-tournament");
                    }}
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
