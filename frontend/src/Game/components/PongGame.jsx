// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Canvas from './Canvas';
// import Ball from './Ball';
// import WinPage from './WinPage';
// import Racket from './Racket';

// const PongGame = ({ isAIEnabled , numPlayers}) => {
//   const navigate = useNavigate();
//   const [ball, setBall] = useState({
//     x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff'
//   });

//   const [leftRacket, setLeftRacket] = useState({
//     x: 1, y: 200, width: 10, height: 100, color: '#000000', velocity: 700,
//   });

//   const [rightRacket, setRightRacket] = useState({
//     x: 989, y: 200, width: 10, height: 100, color: '#000000', velocity: 700,
//   });

//   const [leftRacket1, setLeftRacket1] = useState({
//     x: 1, y: 200, width: 10, height: 100, color: '#000000', velocity: 700,
//   });

//   const [rightRacket1, setRightRacket1] = useState({
//     x: 989, y: 200, width: 10, height: 100, color: '#000000', velocity: 700,
//   });

//   const [keysPressed, setKeysPressed] = useState({
//     w: false,
//     s: false,
//     o: false,
//     l: false,
//   });

//   const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
//   const [winner, setWinner] = useState(null);
//   const [activeKeys, setActiveKeys] = useState({});
//   const [difficulty, setDifficulty] = useState(null);

//   const resetGame = () => {
//     setBall({ x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff' });
//     setLeftRacket((prev) => ({ ...prev, y: 200 }));
//     setRightRacket((prev) => ({ ...prev, y: 200 }));
//     setScores({ leftPlayer: 0, rightPlayer: 0 });
//     setWinner(null);
//   };

//   const moveAIRacket = ( difficulty ) => {
//     setRightRacket((prev) => {
//       let newY = prev.y;
  
//       if (difficulty === 'easy') {
//         newY = ball.y > prev.y + prev.height / 2 ? prev.y + 5 : prev.y - 5;
//       } else if (difficulty === 'medium') {
//         newY = ball.y > prev.y + prev.height / 2 ? prev.y + 10 : prev.y - 10;
//       } else if (difficulty === 'hard') {
//         newY = ball.y - prev.height / 2;
//       }
  
//       newY = Math.max(0, Math.min(newY, 500 - prev.height));
//       return { ...prev, y: newY };
//     });
//   };

//   const resetPositions = () => {
//     setLeftRacket((prev) => ({
//       ...prev,
//       y: 200,
//     }));
//     setRightRacket((prev) => ({
//       ...prev,
//       y: 200,
//     }));
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

//       // if (x - ball.radius <= 0) {
//       //   setScores((prevScores) => ({
//       //     ...prevScores,
//       //     rightPlayer: prevScores.rightPlayer + 1,
//       //   }));
//       //   resetPositions();
//       //   return { ...prevBall, x: 500, y: 250, velocityX: 4, velocityY: 4 };
//       // }
  
//       // if (x + ball.radius >= 1000) {
//       //   setScores((prevScores) => ({
//       //     ...prevScores,
//       //     leftPlayer: prevScores.leftPlayer + 1,
//       //   }));
//       //   resetPositions();
//       //   return { ...prevBall, x: 500, y: 250, velocityX: -4, velocityY: 4 };
//       // }

//       let updatedScores = { ...scores };
//       if (x - ball.radius <= -5) {
//         setScores((prevScores) => ({
//           ...prevScores,
//           rightPlayer: prevScores.rightPlayer + 1,
//         }));
//         updatedScores.rightPlayer += 1;
//         resetPositions();
//         return { ...prevBall, x: 500, y: 250, velocityX: 4, velocityY: 4 };
//       } else if (x + ball.radius >= 1005) {
//         setScores((prevScores) => ({
//           ...prevScores,
//           leftPlayer: prevScores.leftPlayer + 1,
//         }));
//         updatedScores.leftPlayer += 1;
//         resetPositions();
//         return { ...prevBall, x: 500, y: 250, velocityX: -4, velocityY: 4 };
//       }

//       if (updatedScores.leftPlayer === 5) {
//         setWinner('Player 1');
//       } else if (updatedScores.rightPlayer === 5) {
//         setWinner('Player 2');
//       }

//       setScores(updatedScores);

//       return { ...prevBall, x, y, velocityX, velocityY };
//     });
//   }, [leftRacket, rightRacket, scores], 8);

//   const moveLeftRacket = (direction) => {
//     setLeftRacket((prev) => {
//       let newY = prev.y + direction * prev.velocity;
//       newY = Math.max(0, Math.min(newY, 500 - prev.height));
//       return { ...prev, y: newY };
//     });
//   };

//   const moveRightRacket = (direction) => {
//     setRightRacket((prev) => {
//       let newY = prev.y + direction * prev.velocity;
//       newY = Math.max(0, Math.min(newY, 500 - prev.height));
//       return { ...prev, y: newY };
//     });
//   };

//   const handleKeyDown = (e) => {
//     setKeysPressed((prev) => {
//       const updatedKeys = { ...prev, [e.key]: true };

//       if (updatedKeys.w) {
//         moveLeftRacket(-0.1);
//       }
//       if (updatedKeys.s) {
//         moveLeftRacket(0.1);
//       }

//       if (updatedKeys.o) {
//         moveRightRacket(-0.1);
//       }
//       if (updatedKeys.l) {
//         moveRightRacket(0.1);
//       }

//       return updatedKeys;
//     });
//   };

//   const handleKeyUp = (e) => {
//     setKeysPressed((prev) => {
//       const updatedKeys = { ...prev, [e.key]: false };
//       return updatedKeys;
//     });
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   useEffect(() => {
//     const gameInterval = setInterval(() => {
//       if (!winner) {
//         updateBallPosition();
//         if (isAIEnabled) {
//           moveAIRacket( 'me' );
//         }
//       }
//     }, 16);
  
//     return () => clearInterval(gameInterval);
//   }, [updateBallPosition, moveAIRacket, winner, isAIEnabled]);

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
//       if (winner) return;
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
//         <img src={player1Image}></img>
//           <h3>Player 1</h3>
//           <p>Score: {scores.leftPlayer}</p>
//         </div>
//         <div>
//           <img src={player2Image}></img>
//           <h3>{isAIEnabled ? 'AI' : 'Player 2'}</h3>
//           <p>Score: {scores.rightPlayer}</p>
//         </div>
//       </div>
//       <div className='canvas-container'>
//         <Canvas draw={draw} width={1000} height={500} />
//       </div>
//       <Ball x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} updatePosition={updateBallPosition} />
//       <Racket x={leftRacket.x} y={leftRacket.y} width={leftRacket.width} height={leftRacket.height} color={leftRacket.color} upKey="w" downKey="s" onMove={moveLeftRacket} />
//       {!isAIEnabled && (
//         <Racket x={rightRacket.x} y={rightRacket.y} width={rightRacket.width} height={rightRacket.height} color={rightRacket.color} upKey="o" downKey="l" onMove={moveRightRacket} />
//       )}
//       <h3>
//         {/* <img src='../img/W-key.png' alt="W key" className="key-img" />  */}
//         {/* <img src='../img/S-key.png' alt="S key" className="key-img" />  */}
//         Click W to go up and S to go down
//       </h3>
//       {!isAIEnabled && (
//         <h3>
//           {/* <img src='../img/O-key.png' alt="O key" className="key-img" />  */}
//           {/* <img src='../img/L-key.png' alt="L key" className="key-img" />  */}
//           Click O to go up and L to go down
//         </h3>
//       )}
//     </div>
//   );
// };

// export default PongGame;

import React, { useCallback, useState, useEffect } from 'react';
import Canvas from './Canvas';
import WinPage from './WinPage';
import player1Image from '../img/player1.jpeg';
import player2Image from '../img/player2.jpeg';

const TwoPlayerPong = ({ canvasWidth = 1000, canvasHeight = 500 }) => {
    const racketSpeed = 6;
    const maxScore = 5;

    const [ball, setBall] = useState({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        velocityX: 6,
        velocityY: 6,
        radius: 10,
        color: '#fff',
    });

    const [leftRacket, setLeftRacket] = useState({
        x: 10,
        y: canvasHeight / 2 - 50,
        width: 10,
        height: 100,
        color: '#0af3c8',
    });

    const [rightRacket, setRightRacket] = useState({
        x: canvasWidth - 20,
        y: canvasHeight / 2 - 50,
        width: 10,
        height: 100,
        color: '#f39c12',
    });

    const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
    const [winner, setWinner] = useState(null);
    const [keys, setKeys] = useState({});

    const handleKeyDown = (event) => setKeys((prev) => ({ ...prev, [event.key]: true }));
    const handleKeyUp = (event) => setKeys((prev) => ({ ...prev, [event.key]: false }));

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const updateRackets = () => {
        setLeftRacket((prev) => {
            let newY = prev.y;
            if (keys['w'] && newY > 0) newY -= racketSpeed;
            if (keys['s'] && newY + prev.height < canvasHeight) newY += racketSpeed;
            return { ...prev, y: newY };
        });

        setRightRacket((prev) => {
            let newY = prev.y;
            if (keys['ArrowUp'] && newY > 0) newY -= racketSpeed;
            if (keys['ArrowDown'] && newY + prev.height < canvasHeight) newY += racketSpeed;
            return { ...prev, y: newY };
        });
    };

    const checkCollision = (ball, racket) => {
        return (
            ball.x + ball.radius > racket.x &&
            ball.x - ball.radius < racket.x + racket.width &&
            ball.y + ball.radius > racket.y &&
            ball.y - ball.radius < racket.y + racket.height
        );
    };

    const updateBall = () => {
        setBall((prevBall) => {
            let { x, y, velocityX, velocityY } = prevBall;

            x += velocityX;
            y += velocityY;

            if (checkCollision(prevBall, leftRacket)) {
                velocityX = Math.abs(velocityX);
            } else if (checkCollision(prevBall, rightRacket)) {
                velocityX = -Math.abs(velocityX);
            }

            if (y - ball.radius <= 0 || y + ball.radius >= canvasHeight) {
                velocityY = -velocityY;
            }

            if (x - ball.radius <= 0) {
                setScores((prevScores) => ({ ...prevScores, rightPlayer: prevScores.rightPlayer + 0.5 }));
                return resetBall();
            } else if (x + ball.radius >= canvasWidth) {
                setScores((prevScores) => ({ ...prevScores, leftPlayer: prevScores.leftPlayer + 0.5 }));
                return resetBall();
            }

            return { ...prevBall, x, y, velocityX, velocityY };
        });
    };

    const resetBall = () => ({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        velocityX: Math.random() > 0.5 ? 4 : -4,
        velocityY: Math.random() > 0.5 ? 4 : -4,
        radius: 10,
        color: '#fff',
    });

    const checkWinner = () => {
        if (scores.leftPlayer >= maxScore) setWinner('Left Player');
        if (scores.rightPlayer >= maxScore) setWinner('Right Player');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateRackets();
            updateBall();
            checkWinner();
        }, 16);
        return () => clearInterval(interval);
    });

    const draw = useCallback(
        (context) => {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.fillStyle = '#326da4';
            context.fillRect(0, 0, canvasWidth, canvasHeight);

            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fillStyle = ball.color;
            context.fill();

            context.fillStyle = leftRacket.color;
            context.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);

            context.fillStyle = rightRacket.color;
            context.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);
        },
        [ball, leftRacket, rightRacket]
    );

    if (winner) {
        return <WinPage winner={winner} resetGame={() => window.location.reload()} />;
    }

    return (
        <div className="Game-render">
          <div className="player-profiles">
            <div>
            <img src={player1Image}></img>
              <h3>Player 1</h3>
              <p>Score: {scores.leftPlayer}</p>
            </div>
            <div>
              <img src={player2Image}></img>
              <h3>Player 2</h3>
              <p>Score: {scores.rightPlayer}</p>
            </div>
          </div>
          <div className='canvas-container'><Canvas width={canvasWidth} height={canvasHeight} draw={draw} /></div>
          <h3>Player 1: W to go up, S to go down</h3>
          <h3>Player 2: Up arrow to go up, Down arrow to go down</h3>
        </div>
    );
};

export default TwoPlayerPong;
