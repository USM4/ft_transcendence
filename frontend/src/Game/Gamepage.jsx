import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Gamepage = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const navigate = useNavigate();

  const handleclick1 = () => {
    setIsAIEnabled(!isAIEnabled);
    navigate('/play-friend');
  };

  const handleclick2 = () => {
    console.log("Button 2 clicked");
    navigate('/play-bot');
  };

  return (
    <div>
      <button onClick={handleclick2}>Play vs bot</button>
      <button onClick={handleclick1}>Play vs friend</button>
    </div>
  );
};

export default Gamepage;
