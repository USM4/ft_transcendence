import React, { useState, useEffect, useCallback } from 'react';
import Canvas from './Canvas';
import Ball from './Ball';
import Racket from './Racket';
import '../App.css';

const Game = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [ball, setBall] = useState({
    x: 500, y: 250, velocityX: 4, velocityY: 4, radius: 10, color: '#cd202c'
  });

  const [leftRacket, setLeftRacket] = useState({
    x: 40, y: 200, width: 10, height: 100, color: '#33332D', velocity: 5,
  });

  const [rightRacket, setRightRacket] = useState({
    x: 950, y: 200, width: 10, height: 100, color: '#33332D', velocity: 5,
  });

  const moveAIRacket = () => {
    setRightRacket((prev) => {
      const direction = ball.y > prev.y + prev.height / 2 ? 1 : -1;
      let newY = prev.y + direction * prev.velocity;
      newY = Math.max(0, Math.min(newY, 500 - prev.height));
      return { ...prev, y: newY };
    });
  };

  const resetPositions = () => {
    setBall((prev) => ({
      ...prev,
      x: 500,
      y: 250,
      velocityX: prev.velocityX * -1,
      velocityY: 3
    }));
    setLeftRacket((prev) => ({ ...prev, y: 200 }));
    setRightRacket((prev) => ({ ...prev, y: 200 }));
  };

  useEffect(() => {
    if (isAIEnabled) {
      const aiInterval = setInterval(moveAIRacket, 16);
      return () => clearInterval(aiInterval);
    }
  }, [isAIEnabled, ball.y]);

  const updateBallPosition = useCallback(() => {
    setBall((prevBall) => {
      let { x, y, velocityX, velocityY } = prevBall;
      x += velocityX;
      y += velocityY;

      if (y <= 0 || y >= 500) velocityY = -velocityY;

      if (x < 0 || x > 1000) {
        resetPositions();
        return prevBall;
      }

      if (
        x <= leftRacket.x + leftRacket.width &&
        y >= leftRacket.y &&
        y <= leftRacket.y + leftRacket.height
      ) {
        velocityX = -velocityX;
      }
      if (
        x >= rightRacket.x - rightRacket.width &&
        y >= rightRacket.y &&
        y <= rightRacket.y + rightRacket.height
      ) {
        velocityX = -velocityX;
      }

      return { ...prevBall, x, y, velocityX, velocityY };
    });
  }, [leftRacket, rightRacket]);

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
  }

  const draw = useCallback(
    (context) => {
      context.clearRect(0, 0, 1000, 500);
      context.fillStyle = '#f1e1e9';
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
    <div>
      <Canvas draw={draw} width={1000} height={500} />
      <Ball x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} updatePosition={updateBallPosition} />
      <Racket x={leftRacket.x} y={leftRacket.y} width={leftRacket.width} height={leftRacket.height} color={leftRacket.color} upKey="w" downKey="s" onMove={moveLeftRacket} />
      {!isAIEnabled && (
        <Racket x={rightRacket.x} y={rightRacket.y} width={rightRacket.width} height={rightRacket.height} color={rightRacket.color} upKey="o" downKey="l" onMove={moveRightRacket} />
      )}
      <button onClick={() => setIsAIEnabled(!isAIEnabled)}>
        {isAIEnabled ? 'Play with Friend' : 'Play with AI'}
      </button>
    </div>
  );
};

export default Game;





