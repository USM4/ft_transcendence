import React, { useEffect, useRef } from "react";

const GameCanvas = ({ gameState, updateGameState }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const drawGame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw paddles
      context.fillStyle = "black";
      context.fillRect(20, gameState.player1Y, 10, 80);
      context.fillRect(470, gameState.player2Y, 10, 80);

      // Draw ball
      context.fillRect(gameState.ballX, gameState.ballY, 10, 10);
    };

    drawGame();
  }, [gameState]);

  return <canvas ref={canvasRef} width="500" height="400"></canvas>;
};

export default GameCanvas;
