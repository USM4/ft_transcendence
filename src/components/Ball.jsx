import React, { useEffect } from 'react';

const Ball = ({ x, y, radius, color, updatePosition, draw }) => {
  useEffect(() => {
    const animation = setInterval(() => updatePosition(), 16);
    return () => clearInterval(animation);
  }, [updatePosition]);

  return null;
};

export default Ball;
