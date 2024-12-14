import React, { useEffect } from 'react';
import Sketch from 'react-p5';

const Ball = ({ x, y, radius, color, updatePosition, draw }) => {
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      updatePosition();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [updatePosition]);


  return null;
};

export default Ball;