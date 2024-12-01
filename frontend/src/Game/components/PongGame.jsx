import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import Ball from './Ball';
import Racket from './Racket';

const PongGame = ({ isAIEnabled }) => {
  const navigate = useNavigate();
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
  
      // Mise à jour de la position de la balle
      x += velocityX;
      y += velocityY;
  
      // Vérification des collisions avec le haut et le bas
      if (y - ball.radius <= 0 || y + ball.radius >= 500) {
        velocityY = -velocityY;
      }
  
      // Vérification de la collision avec la raquette gauche
      if (
        x - ball.radius <= leftRacket.x + leftRacket.width &&
        y >= leftRacket.y &&
        y <= leftRacket.y + leftRacket.height
      ) {
        velocityX = Math.abs(velocityX);  // Reflet de la balle vers la droite
        x = leftRacket.x + leftRacket.width + ball.radius;
      }
  
      // Vérification de la collision avec la raquette droite
      if (
        x + ball.radius >= rightRacket.x &&
        y >= rightRacket.y &&
        y <= rightRacket.y + rightRacket.height
      ) {
        velocityX = -Math.abs(velocityX);  // Reflet de la balle vers la gauche
        x = rightRacket.x - ball.radius;
      }
  
      // Condition pour marquer un but
      let updatedScores = { ...scores };
      if (x - ball.radius <= 0) {
        updatedScores.rightPlayer += 1;
      } else if (x + ball.radius >= 1000) {
        updatedScores.leftPlayer += 1;
      }

      // Vérification du score
      if (updatedScores.leftPlayer === 5) {
        setWinner('Player 1');
      } else if (updatedScores.rightPlayer === 5) {
        setWinner('Player 2');
      }

      // Mise à jour des scores
      setScores(updatedScores);

      // Réinitialisation de la balle à la position de départ après un score
      if (x - ball.radius <= 0 || x + ball.radius >= 1000) {
        return {
          ...prevBall,
          x: 500,
          y: 250,
          velocityX: (updatedScores.leftPlayer === 5 ? -1 : 1) * 4, // La balle revient de l'autre côté
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

  if (winner) {
    return (
      <div className="winner-screen">
        <h1>{winner} Wins!</h1>
        <button onClick={() => navigate("/game")}>Go to Home</button>
        <button onClick={resetGame}>Play Again</button>
      </div>
    );
  }

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
    },
    [ball, leftRacket, rightRacket]
  );

  return (
    <div className='Game-render'>
      <div className="player-profiles">
        <div>
          <h3>Player 1</h3>
          <p>Score: {scores.leftPlayer}</p>
        </div>
        <div>
          <h3>{isAIEnabled ? 'AI' : 'Player 2'}</h3>
          <p>Score: {scores.rightPlayer}</p>
        </div>
      </div>
      <Canvas draw={draw} width={1000} height={500} />
      <Ball x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} updatePosition={updateBallPosition} />
    </div>
  );
};

export default PongGame;

