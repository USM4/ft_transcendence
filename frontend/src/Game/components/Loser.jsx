import React from 'react';
import { useNavigate } from 'react-router-dom';

const Loser = ({ loser, resetGame }) => {
  const navigate = useNavigate();
  return (
    <div className="win-page">
      <h1>{loser} Lost!</h1>
      <button onClick={() => navigate("/tournament/options")}>Back to home</button>
      <button onClick={() => navigate('/tournament/options/game')}>
        Play Again
      </button>
    </div>
  );
};

export default Loser;

