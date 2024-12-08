import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from './Canvas.jsx';
import Ball from './Ball.jsx';
import WinPage from './WinPage.jsx';
import player1Image from '/pensioner.png';
import player2Image from '/pensioner.png';




const PongGame = ({ isAIEnabled }) => {

  console.log('PongGame.jsx: PongGame()');
  const matche = JSON.parse(localStorage.getItem('matche')) || [];
  const [ball, setBall] = useState({
    x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff'
  });

  const [leftRacket, setLeftRacket] = useState({
    x: 40, y: 200, width: 10, height: 100, color: '#000000', velocity: 20,
  });

  const [rightRacket, setRightRacket] = useState({
    x: 950, y: 200, width: 10, height: 100, color: '#000000', velocity: 20,
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
    setBall({ x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#fff' });
    setLeftRacket((prev) => ({ ...prev, y: 200 }));
    setRightRacket((prev) => ({ ...prev, y: 200 }));
    setScores({ leftPlayer: 0, rightPlayer: 0 });
    setWinner(null);
  };

  const moveAIRacket = () => {
    setRightRacket((prev) => {
      const direction = ball.y > prev.y + prev.height / 2 ? 1 : -1;
      let newY = prev.y + direction * prev.velocity;
      newY = Math.max(0, Math.min(newY, 500 - prev.height));
      return { ...prev, y: newY };
    });
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

      let updatedScores = { ...scores };
      if (x - ball.radius <= 0) {
        updatedScores.rightPlayer += 1;
      } else if (x + ball.radius >= 1000) {
        updatedScores.leftPlayer += 1;
      }

      if (updatedScores.leftPlayer === 5) {
        setWinner('Player 1');
      } else if (updatedScores.rightPlayer === 5) {
        setWinner('Player 2');
      }

      setScores(updatedScores);

      if (x - ball.radius <= 0 || x + ball.radius >= 1000) {
        return {
          ...prevBall,
          x: 500,
          y: 250,
          velocityX: (updatedScores.leftPlayer === 5 ? -1 : 1) * 4,
          velocityY: 4,
        };
      }

      return { ...prevBall, x, y, velocityX, velocityY };
    });
  }, [leftRacket, rightRacket, scores]);

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
        moveLeftRacket(-1);
      }
      if (updatedKeys.s) {
        moveLeftRacket(1);
      }

      if (updatedKeys.o) {
        moveRightRacket(-1);
      }
      if (updatedKeys.l) {
        moveRightRacket(1);
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
      <Canvas draw={draw} width={1000} height={500} />
      <Ball x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} updatePosition={updateBallPosition} />
      <h3>
        {/* <img src='../img/W-key.png' alt="W key" className="key-img" />  */}
        {/* <img src='../img/S-key.png' alt="S key" className="key-img" />  */}
        Click W to go up and S to go down
      </h3>
      <h3>
        {/* <img src='../img/O-key.png' alt="O key" className="key-img" />  */}
        {/* <img src='../img/L-key.png' alt="L key" className="key-img" />  */}
        Click O to go up and L to go down
      </h3>
    </div>
  );
};

export default PongGame;


