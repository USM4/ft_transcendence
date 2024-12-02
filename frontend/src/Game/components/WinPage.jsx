import React from 'react';

const WinPage = ({ winner, resetGame }) => {
  return (
    <div className="win-page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{winner} Wins!</h1>
      <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Play Again
      </button>
    </div>
  );
};

export default WinPage;

