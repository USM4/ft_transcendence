import React, { useRef, useEffect } from 'react';

const Canvas = ({ draw, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    let animationFrameId;
    const render = () => {
      draw(context);
      animationFrameId = requestAnimationFrame(render);
    };
  
    render();
  
    return () => cancelAnimationFrame(animationFrameId);
  }, [draw]);

  return (
      <canvas className='multi-canvas-game' ref={canvasRef} width={width} height={height} />
  );
};

export default Canvas;