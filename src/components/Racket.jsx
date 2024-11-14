import React, { useEffect } from 'react';

const Racket = ({ x, y, width, height, color, upKey, downKey, onMove }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === upKey) onMove(-1);
      if (event.key === downKey) onMove(1);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [upKey, downKey, onMove]);

  return null;
};

export default Racket;
