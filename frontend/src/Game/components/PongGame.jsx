import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import Ball from './Ball';
import WinPage from './WinPage';
import Racket from './Racket';
import player1Image from '../img/player1.jpeg';
import player2Image from '../img/player2.jpeg';

const PongGame = ({ isAIEnabled }) => {
  const navigate = useNavigate();
  const [ball, setBall] = useState({
    x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff'
  });

  const [leftRacket, setLeftRacket] = useState({
    x: 1, y: 200, width: 10, height: 100, color: '#000000', velocity: 700,
  });

  const [rightRacket, setRightRacket] = useState({
    x: 989, y: 200, width: 10, height: 100, color: '#000000', velocity: 700,
  });

  const [keysPressed, setKeysPressed] = useState({
    w: false,
    s: false,
    o: false,
    l: false,
  });

  const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
  const [winner, setWinner] = useState(null);
  const [activeKeys, setActiveKeys] = useState({});
  const [difficulty, setDifficulty] = useState(null);

  const resetGame = () => {
    setBall({ x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff' });
    setLeftRacket((prev) => ({ ...prev, y: 200 }));
    setRightRacket((prev) => ({ ...prev, y: 200 }));
    setScores({ leftPlayer: 0, rightPlayer: 0 });
    setWinner(null);
  };

  const moveAIRacket = ( difficulty ) => {
    setRightRacket((prev) => {
      let newY = prev.y;
  
      if (difficulty === 'easy') {
        newY = ball.y > prev.y + prev.height / 2 ? prev.y + 5 : prev.y - 5;
      } else if (difficulty === 'medium') {
        newY = ball.y > prev.y + prev.height / 2 ? prev.y + 10 : prev.y - 10;
      } else if (difficulty === 'hard') {
        newY = ball.y - prev.height / 2;
      }
  
      newY = Math.max(0, Math.min(newY, 500 - prev.height));
      return { ...prev, y: newY };
    });
  };

  const resetPositions = () => {
    setLeftRacket((prev) => ({
      ...prev,
      y: 200,
    }));
    setRightRacket((prev) => ({
      ...prev,
      y: 200,
    }));
  };

  const updateBallPosition = useCallback(() => {
    setBall((prevBall) => {
      let { x, y, velocityX, velocityY } = prevBall;

      x += velocityX;
      y += velocityY;

      if (y - ball.radius <= 0 || y + ball.radius >= 500) {
        velocityY = -velocityY;
      }

      if (
        x - ball.radius <= leftRacket.x + leftRacket.width &&
        y >= leftRacket.y &&
        y <= leftRacket.y + leftRacket.height
      ) {
        velocityX = Math.abs(velocityX);
        x = leftRacket.x + leftRacket.width + ball.radius;
      }
  
      if (
        x + ball.radius >= rightRacket.x &&
        y >= rightRacket.y &&
        y <= rightRacket.y + rightRacket.height
      ) {
        velocityX = -Math.abs(velocityX);
        x = rightRacket.x - ball.radius;
      }

      // if (x - ball.radius <= 0) {
      //   setScores((prevScores) => ({
      //     ...prevScores,
      //     rightPlayer: prevScores.rightPlayer + 1,
      //   }));
      //   resetPositions();
      //   return { ...prevBall, x: 500, y: 250, velocityX: 4, velocityY: 4 };
      // }
  
      // if (x + ball.radius >= 1000) {
      //   setScores((prevScores) => ({
      //     ...prevScores,
      //     leftPlayer: prevScores.leftPlayer + 1,
      //   }));
      //   resetPositions();
      //   return { ...prevBall, x: 500, y: 250, velocityX: -4, velocityY: 4 };
      // }

      let updatedScores = { ...scores };
      if (x - ball.radius <= -5) {
        setScores((prevScores) => ({
          ...prevScores,
          rightPlayer: prevScores.rightPlayer + 1,
        }));
        updatedScores.rightPlayer += 1;
        resetPositions();
        return { ...prevBall, x: 500, y: 250, velocityX: 4, velocityY: 4 };
      } else if (x + ball.radius >= 1005) {
        setScores((prevScores) => ({
          ...prevScores,
          leftPlayer: prevScores.leftPlayer + 1,
        }));
        updatedScores.leftPlayer += 1;
        resetPositions();
        return { ...prevBall, x: 500, y: 250, velocityX: -4, velocityY: 4 };
      }

      if (updatedScores.leftPlayer === 5) {
        setWinner('Player 1');
      } else if (updatedScores.rightPlayer === 5) {
        setWinner('Player 2');
      }

      setScores(updatedScores);

      return { ...prevBall, x, y, velocityX, velocityY };
    });
  }, [leftRacket, rightRacket, scores], 8);

  const moveLeftRacket = (direction) => {
    setLeftRacket((prev) => {
      let newY = prev.y + direction * prev.velocity;
      newY = Math.max(0, Math.min(newY, 500 - prev.height));
      return { ...prev, y: newY };
    });
  };

  const moveRightRacket = (direction) => {
    setRightRacket((prev) => {
      let newY = prev.y + direction * prev.velocity;
      newY = Math.max(0, Math.min(newY, 500 - prev.height));
      return { ...prev, y: newY };
    });
  };

  const handleKeyDown = (e) => {
    setKeysPressed((prev) => {
      const updatedKeys = { ...prev, [e.key]: true };

      if (updatedKeys.w) {
        moveLeftRacket(-0.1);
      }
      if (updatedKeys.s) {
        moveLeftRacket(0.1);
      }

      if (updatedKeys.o) {
        moveRightRacket(-0.1);
      }
      if (updatedKeys.l) {
        moveRightRacket(0.1);
      }

      return updatedKeys;
    });
  };

  const handleKeyUp = (e) => {
    setKeysPressed((prev) => {
      const updatedKeys = { ...prev, [e.key]: false };
      return updatedKeys;
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      if (!winner) {
        updateBallPosition();
        if (isAIEnabled) {
          moveAIRacket( 'me' );
        }
      }
    }, 16);
  
    return () => clearInterval(gameInterval);
  }, [updateBallPosition, moveAIRacket, winner, isAIEnabled]);

  const draw = useCallback(
    (context) => {
      context.clearRect(0, 0, 1000, 500);
      context.fillStyle = '#326da4';
      context.fillRect(0, 0, 1000, 500);

      context.beginPath();
      context.fillStyle = ball.color;
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = leftRacket.color;
      context.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);

      context.fillStyle = rightRacket.color;
      context.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);
      if (winner) return;
    },
    [ball, leftRacket, rightRacket]
  );

  if (winner) {
    return <WinPage winner={winner} resetGame={resetGame} />;
  }

  return (
    <div className='Game-render'>
      <div className="player-profiles">
        <div>
        <img src={player1Image}></img>
          <h3>Player 1</h3>
          <p>Score: {scores.leftPlayer}</p>
        </div>
        <div>
          <img src={player2Image}></img>
          <h3>{isAIEnabled ? 'AI' : 'Player 2'}</h3>
          <p>Score: {scores.rightPlayer}</p>
        </div>
      </div>
      <div className='canvas-container'>
        <Canvas draw={draw} width={1000} height={500} />
      </div>
      <Ball x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} updatePosition={updateBallPosition} />
      <Racket x={leftRacket.x} y={leftRacket.y} width={leftRacket.width} height={leftRacket.height} color={leftRacket.color} upKey="w" downKey="s" onMove={moveLeftRacket} />
      {!isAIEnabled && (
        <Racket x={rightRacket.x} y={rightRacket.y} width={rightRacket.width} height={rightRacket.height} color={rightRacket.color} upKey="o" downKey="l" onMove={moveRightRacket} />
      )}
      <h3>
        {/* <img src='../img/W-key.png' alt="W key" className="key-img" />  */}
        {/* <img src='../img/S-key.png' alt="S key" className="key-img" />  */}
        Click W to go up and S to go down
      </h3>
      {!isAIEnabled && (
        <h3>
          {/* <img src='../img/O-key.png' alt="O key" className="key-img" />  */}
          {/* <img src='../img/L-key.png' alt="L key" className="key-img" />  */}
          Click O to go up and L to go down
        </h3>
      )}
    </div>
  );
};

export default PongGame;


// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Canvas from './Canvas';
// import Ball from './Ball';
// import WinPage from './WinPage';
// import Racket from './Racket';
// import player1Image from '../img/player1.jpeg';
// import player2Image from '../img/player2.jpeg';

// const PongGame = ({ isAIEnabled }) => {
//   const navigate = useNavigate();

//   const [ball, setBall] = useState({
//     x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff'
//   });

//   const [leftRacket, setLeftRacket] = useState({
//     x: 1, y: 200, width: 10, height: 100, color: '#000000', velocity: 200, // Adjusted velocity for smoother movement
//   });

//   const [rightRacket, setRightRacket] = useState({
//     x: 989, y: 200, width: 10, height: 100, color: '#000000', velocity: 200,
//   });

//   const [keysPressed, setKeysPressed] = useState({
//     w: false,
//     s: false,
//     o: false,
//     l: false,
//   });

//   const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
//   const [winner, setWinner] = useState(null);

//   const resetGame = () => {
//     setBall({ x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff' });
//     setLeftRacket((prev) => ({ ...prev, y: 200 }));
//     setRightRacket((prev) => ({ ...prev, y: 200 }));
//     setScores({ leftPlayer: 0, rightPlayer: 0 });
//     setWinner(null);
//   };

//   const resetPositions = () => {
//     setLeftRacket((prev) => ({ ...prev, y: 200 }));
//     setRightRacket((prev) => ({ ...prev, y: 200 }));
//   };

//   const updateBallPosition = useCallback(() => {
//     setBall((prevBall) => {
//       let { x, y, velocityX, velocityY } = prevBall;

//       x += velocityX;
//       y += velocityY;

//       if (y - ball.radius <= 0 || y + ball.radius >= 500) {
//         velocityY = -velocityY;
//       }

//       if (
//         x - ball.radius <= leftRacket.x + leftRacket.width &&
//         y >= leftRacket.y &&
//         y <= leftRacket.y + leftRacket.height
//       ) {
//         velocityX = Math.abs(velocityX);
//         x = leftRacket.x + leftRacket.width + ball.radius;
//       }

//       if (
//         x + ball.radius >= rightRacket.x &&
//         y >= rightRacket.y &&
//         y <= rightRacket.y + rightRacket.height
//       ) {
//         velocityX = -Math.abs(velocityX);
//         x = rightRacket.x - ball.radius;
//       }

//       let updatedScores = { ...scores };
//       if (x - ball.radius <= -5) {
//         updatedScores.rightPlayer += 1;
//         resetPositions();
//         return { ...prevBall, x: 500, y: 250, velocityX: 4, velocityY: 4 };
//       } else if (x + ball.radius >= 1005) {
//         updatedScores.leftPlayer += 1;
//         resetPositions();
//         return { ...prevBall, x: 500, y: 250, velocityX: -4, velocityY: 4 };
//       }

//       if (updatedScores.leftPlayer === 5) setWinner('Player 1');
//       else if (updatedScores.rightPlayer === 5) setWinner('Player 2');

//       setScores(updatedScores);
//       return { ...prevBall, x, y, velocityX, velocityY };
//     });
//   }, [leftRacket, rightRacket, scores]);

//   const handleKeyDown = (e) => {
//     setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
//   };

//   const handleKeyUp = (e) => {
//     setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
//   };

//   useEffect(() => {
//     let lastTime = performance.now();

//     const moveRackets = (time) => {
//       const deltaTime = (time - lastTime) / 1000; // Time in seconds
//       lastTime = time;

//       if (keysPressed.w) {
//         setLeftRacket((prev) => ({
//           ...prev,
//           y: Math.max(0, prev.y - prev.velocity * deltaTime),
//         }));
//       }
//       if (keysPressed.s) {
//         setLeftRacket((prev) => ({
//           ...prev,
//           y: Math.min(500 - prev.height, prev.y + prev.velocity * deltaTime),
//         }));
//       }
//       if (keysPressed.o) {
//         setRightRacket((prev) => ({
//           ...prev,
//           y: Math.max(0, prev.y - prev.velocity * deltaTime),
//         }));
//       }
//       if (keysPressed.l) {
//         setRightRacket((prev) => ({
//           ...prev,
//           y: Math.min(500 - prev.height, prev.y + prev.velocity * deltaTime),
//         }));
//       }

//       requestAnimationFrame(moveRackets);
//     };

//     const animationId = requestAnimationFrame(moveRackets);
//     return () => cancelAnimationFrame(animationId);
//   }, [keysPressed]);

//   useEffect(() => {
//     const gameInterval = setInterval(() => {
//       if (!winner) {
//         updateBallPosition();
//         if (isAIEnabled) {
//           setRightRacket((prev) => {
//             const direction = ball.y > prev.y + prev.height / 2 ? 1 : -1;
//             let newY = prev.y + direction * prev.velocity * 0.02; // Smooth AI movement
//             newY = Math.max(0, Math.min(newY, 500 - prev.height));
//             return { ...prev, y: newY };
//           });
//         }
//       }
//     }, 16);

//     return () => clearInterval(gameInterval);
//   }, [updateBallPosition, isAIEnabled, winner]);

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   const draw = useCallback(
//     (context) => {
//       context.clearRect(0, 0, 1000, 500);
//       context.fillStyle = '#326da4';
//       context.fillRect(0, 0, 1000, 500);

//       context.beginPath();
//       context.fillStyle = ball.color;
//       context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
//       context.fill();

//       context.fillStyle = leftRacket.color;
//       context.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);

//       context.fillStyle = rightRacket.color;
//       context.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);
//     },
//     [ball, leftRacket, rightRacket]
//   );

//   if (winner) {
//     return <WinPage winner={winner} resetGame={resetGame} />;
//   }

//   return (
//     <div className='Game-render'>
//       <div className="player-profiles">
//         <div>
//           <img src={player1Image} alt="Player 1" />
//           <h3>Player 1</h3>
//           <p>Score: {scores.leftPlayer}</p>
//         </div>
//         <div>
//           <img src={player2Image} alt="Player 2" />
//           <h3>{isAIEnabled ? 'AI' : 'Player 2'}</h3>
//           <p>Score: {scores.rightPlayer}</p>
//         </div>
//       </div>
//       <Canvas draw={draw} width={1000} height={500} />
//     </div>
//   );
// };

// export default PongGame;
