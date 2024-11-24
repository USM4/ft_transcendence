import react from 'react';
import oredoine from '/oredoine.jpeg';
import TournamentHearchy from './TournamentHearchy';

const Tournament = () => {

  return (
    <div className="tournament-component">
      <div className="Tournament-Title">
        <h1> Smash Masters Championship </h1>
      </div>
      <div className="tournament-header">
        <TournamentHearchy/>
      </div>
      <div className="start-tournament">
        <button> <p> Start The Party 🔥 </p> </button>
      </div>
    </div>
  );
};

export default Tournament;