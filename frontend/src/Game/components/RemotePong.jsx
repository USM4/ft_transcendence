import React, { useState, useEffect, useCallback,useContext } from 'react';
import Canvas from './Canvas';
import Ball from './Ball';
import WinPage from './WinPage';
import Racket from './Racket';
import player1Image from '../img/player1.jpeg';
import player2Image from '../img/player2.jpeg';
import { MatchmakingContext } from './Matchmaking';
import { use } from 'react';




const RemotePong = () => {
  const gamesocket = useContext(MatchmakingContext);
  const [ball, setBall] = useState({});

  const [playerRacket, setPlayerRacket] = useState({
    x: 10, y: 200, width: 10, height: 100, color: '#000000', velocity: 20,
  });

  const [friendRacket, setFriendRacket] = useState({
    x: 980, y: 200, width: 10, height: 100, color: '#000000', velocity: 20,
  });

  const [keysPressed, setKeysPressed] = useState({
    w: false,
    s: false,
  });

  const [scores, setScores] = useState({ Player: 0, Friend: 0 });
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    gamesocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setBall(data.ball);
      setPlayerRacket(data.playerRacket);
      setFriendRacket(data.friendRacket);
      setScores(data.scores);
      setWinner(data.winner);
    }
  }, [gamesocket]);
  useEffect(() => {
    gamesocket.send(JSON.stringify({ type: 'movepaddle', keysPressed }));
  }, [keysPressed]);

  const handleKeyDown = (e) => {
    setKeysPressed((prev) => {
      const updatedKeys = { ...prev, [e.key]: true };

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

  // useEffect(() => {
  //   const gameInterval = setInterval(() => {
  //     if (!winner) {
  //       updateBallPosition();
  //       if (isAIEnabled) {
  //         moveAIRacket();
  //       }
  //     }
  //   }, 16);
  
  //   return () => clearInterval(gameInterval);
  // }, [updateBallPosition, moveAIRacket, winner, isAIEnabled]);

  const draw = useCallback(
    (context) => {
      context.clearRect(0, 0, 1000, 500);
      context.fillStyle = '#326da4';
      context.fillRect(0, 0, 1000, 500);

      context.beginPath();
      context.fillStyle = ball.color;
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = playerRacket.color;
      context.fillRect(playerRacket.x, playerRacket.y, playerRacket.width, playerRacket.height);

      context.fillStyle = friendRacket.color;
      context.fillRect(friendRacket.x, friendRacket.y, friendRacket.width, friendRacket.height);
      if (winner) return;
    },
    [ball, playerRacket, friendRacket]
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
          <p>Score: {scores.Player}</p>
        </div>
        <div>
          <img src={player2Image}></img>
          <h3>{isAIEnabled ? 'AI' : 'Player 2'}</h3>
          <p>Score: {scores.Friend}</p>
        </div>
      </div>
      <div className='canvas-container'>
        <Canvas draw={draw} width={1000} height={500} />
      </div>
      <Ball x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} updatePosition={updateBallPosition} />
      <Racket x={playerRacket.x} y={playerRacket.y} width={playerRacket.width} height={playerRacket.height} color={playerRacket.color} upKey="w" downKey="s" onMove={movePlayerRacket} />
        <Racket x={friendRacket.x} y={friendRacket.y} width={friendRacket.width} height={friendRacket.height} color={friendRacket.color} upKey="o" downKey="l" onMove={moveFriendRacket} />

      <h3>
        Click W to go up and S to go down
      </h3>
    </div>
  );
};

export default RemotePong;
