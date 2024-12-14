import React, { useRef, useEffect } from 'react';
// import '../App.css'

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, 1000, 500);
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 1000, 500);
      
      context.beginPath();
      context.fillStyle = ball.color;
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = leftRacket.color;
      context.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);
      
      context.fillStyle = rightRacket.color;
      context.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);
      requestAnimationFrame(animate);
      // if (winner) return;
    }
    animate();
  })

  return (
      <canvas className='canvas-game' ref={canvasRef} width={width} height={height} />
  );
};

export default Canvas;