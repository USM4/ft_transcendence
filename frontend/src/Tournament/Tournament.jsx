import react from 'react';
import oredoine from '/oredoine.jpeg';
import TournamentHearchy from './TournamentHearchy';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Tournament = () => {
  const navigate = useNavigate();
  return (
    <div className="tournament-component">
      <div className="return-icon">
        <button
          onClick={() => { 
            localStorage.removeItem('tournamentState');
            localStorage.removeItem('players');
             navigate("/tournament/options/tournament-registration"); 
            }}>
          <ArrowBackIcon fontSize="large" />
        </button>
      </div>
      <div className="Tournament-Title">
        <h1> Smash Masters Championship </h1>
      </div>
      <div className="tournament-header">
        <TournamentHearchy />
      </div>

    </div>
  );
};

export default Tournament;