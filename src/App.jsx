import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;














// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import './App.css';

// const socket = io('http://localhost:8080');

// function App() {
//   const [player1Y, setPlayer1Y] = useState(150);
//   const [player2Y, setPlayer2Y] = useState(150);
//   const playerType = useRef(null);

//   useEffect(() => {
//     playerType.current = window.confirm("Are you Player 1? Click 'Cancel' if you're Player 2") ? 'player1' : 'player2';

//     socket.on('positionUpdate', (positions) => {
//       setPlayer1Y(positions.player1);
//       setPlayer2Y(positions.player2);
//     });

//     return () => {
//       socket.off('positionUpdate');
//     };
//   }, []);

//   const handleKeyDown = (e) => {
//     const step = 20;
//     let newPosition;

//     if (playerType.current === 'player1') {
//       if (e.key === 'w') newPosition = Math.max(player1Y - step, 0);
//       if (e.key === 's') newPosition = Math.min(player1Y + step, 300);
//       setPlayer1Y(newPosition);
//     }

//     else if (playerType.current === 'player2') {
//       if (e.key === 'ArrowUp') newPosition = Math.max(player2Y - step, 0);
//       if (e.key === 'ArrowDown') newPosition = Math.min(player2Y + step, 300);
//       setPlayer2Y(newPosition);
//     }

//     socket.emit('movePaddle', { player: playerType.current, position: newPosition });
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [player1Y, player2Y]);

//   return (
//     <div className="game-container">
//       <div className="paddle player1" style={{ top: `${player1Y}px` }}></div>
//       <div className="ball"></div>
//       <div className="paddle player2" style={{ top: `${player2Y}px` }}></div>
//     </div>
//   );
// }

// export default App;










//   const navigate = useNavigate()

//   const handleLocalclick = () => {
//     navigate('/local')
//   }

//   return (
//     <>
//       <h1>Welcome to the game</h1>
//       <div>
//         <button>localPlay</button>
//         <button>onliePlay</button>
//       </div>
//     </>
//   )