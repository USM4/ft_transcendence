import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import Ball from './Ball';
import WinPage from './WinPage';
import Racket from './Racket';
import player1Image from '../img/player1.jpeg';
import player2Image from '../img/player2.jpeg';




const PongGame = ({ isAIEnabled }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const keys = {};
  const ballRef = useRef({
    x: 500, y: 250, velocityX: 2, velocityY: 2, radius: 10, color: '#ff0000'
  });

  const leftRacket = useRef({
    x: 10, y: 200, width: 10, height: 100, color: '#0000ff', velocity: 13,
  });

  const rightRacket = useRef({
    x: 980, y: 200, width: 10, height: 100, color: '#000000', velocity: 13,
  });

  const [keysPressed, setKeysPressed] = useState({
    w: false,
    s: false,
    o: false,
    l: false,
  });

  const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    ballRef.current = { x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#ff0000' };
    // setLeftRacket((prev) => ({ ...prev, y: 200 }));
    // setRightRacket((prev) => ({ ...prev, y: 200 }));
    setScores({ leftPlayer: 0, rightPlayer: 0 });
    setWinner(null);
  };

  const moveAIRacket = () => {
    setRightRacket((prev) => {
      const direction = ballRef.current.y > prev.y + prev.height / 2 ? 1 : -1;
      let newY = prev.y + direction * prev.velocity;
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
    // setBall((prevBall) => {
      let { x, y, velocityX, velocityY } = ballRef.current;
      console.log('===========================');
      console.log('velocityY', velocityY);
      console.log("y + ballRef.current.radius", y + ballRef.current.radius);
      x += velocityX + Math.random() * 0.5;
      y += velocityY + Math.random() * 0.5;
      
      if (y - ballRef.current.radius <= 0) {
        console.log("ball hit top or bottom");
        y = radius;
        velocityY = -velocityY;
      } 
      if (y + ballRef.current.radius >= 500)
      {
        y = 500 - ballRef.current.radius;
        velocityY = -velocityY; 
      }
        console.log('===========================');

      if (
        x - ballRef.current.radius <= leftRacket.current.x + leftRacket.current.width &&
        y >= leftRacket.current.y &&
        y <= leftRacket.current.y + leftRacket.current.height
      ) {
        velocityX = Math.abs(velocityX);
        x = leftRacket.current.x + leftRacket.current.width + ballRef.current.radius;
      }
  
      if (
        x + ballRef.current.radius >= rightRacket.current.x &&
        y >= rightRacket.current.y &&
        y <= rightRacket.current.y + rightRacket.current.height
      ) {
        velocityX = -Math.abs(velocityX);
        x = rightRacket.current.x - ballRef.current.radius;
      }
      ballRef.current = {
        ...ballRef.current,
        x: x,
        y: y,
        velocityX: velocityX,
        velocityY: velocityY
      };

      // let updatedScores = { ...scores };
      // if (x - ballRef.current.radius <= 0) {
      //   setScores((prevScores) => ({
      //     ...prevScores,
      //     rightPlayer: prevScores.rightPlayer + 1,
      //   }));
      //   updatedScores.rightPlayer += 1;
      //   resetPositions();
      //   return { ...prevBall, x: 500, y: 250, velocityX: 4, velocityY: 4 };
      // } else if (x + ballRef.current.radius >= 1000) {
      //   setScores((prevScores) => ({
      //     ...prevScores,
      //     leftPlayer: prevScores.leftPlayer + 1,
      //   }));
      //   updatedScores.leftPlayer += 1;
      //   resetPositions();
      //   return { ...prevBall, x: 500, y: 250, velocityX: -4, velocityY: 4 };
      // }

      // if (updatedScores.leftPlayer === 5) {
      //   setWinner('Player 1');
      // } else if (updatedScores.rightPlayer === 5) {
      //   setWinner('Player 2');
      // }

      // setScores(updatedScores);

    // });
  }, []);

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  //   window.addEventListener('keyup', handleKeyUp);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //     window.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, []);

  useEffect(() => {
    const moveLeftRacket = (direction) => {
      // setLeftRacket((prev) => {
        console.log(direction > 0 ? 'down' : 'up');
        let newY = leftRacket.current.y + direction * leftRacket.current.velocity;
        newY = Math.max(0, Math.min(newY, 500 - leftRacket.current.height));
        leftRacket.current = { ...leftRacket.current, y: newY };
      // });
    };
  
    const moveRightRacket = (direction) => {
      // setRightRacket((prev) => {
        let newY = rightRacket.current.y + direction * rightRacket.current.velocity;
        newY = Math.max(0, Math.min(newY, 500 - rightRacket.current.height));
        rightRacket.current = { ...rightRacket.current, y: newY };
      // });
    };
    const handleKeyDown = (e) => {
      keys[e.key] = true; // Set the key state to true when pressed
        if (keys['w'] || keys['W']) {
          moveLeftRacket(-1);
        }
        if (keys['s'] || keys['S']) {
          moveLeftRacket(1);
        }
  
        if (keys['ArrowUp']) {
          moveRightRacket(-1);
        }
        if (keys['ArrowDown']) {
          moveRightRacket(1);
        }
      };
  
    window.addEventListener('keydown', handleKeyDown);
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };
    window.addEventListener('keyup', handleKeyUp);
    
    const animate = () => {
      if (canvasRef.current === null) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, 1000, 500);
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 1000, 500);
      
      updateBallPosition();
      context.beginPath();
      context.fillStyle = ballRef.current.color;
      context.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = leftRacket.current.color;
      context.fillRect(leftRacket.current.x, leftRacket.current.y, leftRacket.current.width, leftRacket.current.height);
      
      context.fillStyle = rightRacket.current.color;
      context.fillRect(rightRacket.current.x, rightRacket.current.y, rightRacket.current.width, rightRacket.current.height);
      requestAnimationFrame(animate);
      // if (winner) return;
    }
    animate();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [])

  // useEffect(() => {
  //   const gameInterval = setInterval(() => {
  //     if (!winner) {
  //       updateBallPosition();
  //       if (isAIEnabled) {
  //         moveAIRacket();
  //       }
  //     }
  //   }, 1);
  
  //   return () => clearInterval(gameInterval);
  // }, [updateBallPosition, moveAIRacket, winner, isAIEnabled]);

  // const draw = useCallback(
  //   (context) => {
  //   },
  //   [ball, leftRacket, rightRacket]
  // );

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
        <div className="score-displayers">
          <img src={player2Image}></img>
          <h3>{isAIEnabled ? 'AI' : 'Player 2'}</h3>
          <p>Score: {scores.rightPlayer}</p>
        </div>
      </div>
      <div className='canvas-container'>
      <canvas className='canvas-game' ref={canvasRef} width={1000} height={500} />
        {/* <Canvas width={1000} height={500} /> */}
      </div>
      {/* <Ball x={ballRef.current.x} y={ballRef.current.y} radius={ballRef.current.radius} color={ballRef.current.color} updatePosition={updateBallPosition} /> */}
      {/* <Racket x={leftRacket.x} y={leftRacket.y} width={leftRacket.width} height={leftRacket.height} color={leftRacket.color} upKey="w" downKey="s" onMove={moveLeftRacket} />
      {!isAIEnabled && (
        <Racket x={rightRacket.x} y={rightRacket.y} width={rightRacket.width} height={rightRacket.height} color={rightRacket.color} upKey="o" downKey="l" onMove={moveRightRacket} />
      )} */}
      <h3>
        {/* <img src='../img/W-key.png' alt="W key" className="key-img" />  */}
        {/* <img src='../img/S-key.png' alt="S key" className="key-img" />  */}
        {/* Click W to go up and S to go down */}
      </h3>
      {!isAIEnabled && (
        <h3>
          {/* <img src='../img/O-key.png' alt="O key" className="key-img" />  */}
          {/* <img src='../img/L-key.png' alt="L key" className="key-img" />  */}
          {/* Click O to go up and L to go down */}
        </h3>
      )}
    </div>
  );
};

export default PongGame;

