import React from 'react';
import { useNavigate } from 'react-router-dom';

const WinPage = ({ winner, resetGame }) => {
  const navigate = useNavigate();
  return (
    <div className="win-page">
      <h1>{winner} Wins!</h1>
      <button onClick={() => navigate("/tournament/options/game")}>Back to home</button>
      <button onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
};

export default WinPage;

