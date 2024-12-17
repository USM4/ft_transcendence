import React, { useState, useEffect, useCallback,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import player1Image from '/pensioner.png';
import player2Image from '/pensioner.png';


const PongGame = () => {
  const navigate = useNavigate();
  const matche = JSON.parse(localStorage.getItem('matche')) || {};
  const canvasRef = useRef(null);
  const keys = {};
  const ballRef = useRef({
    x: 500,
    y: 250,
    velocityX: 2,
    velocityY: 2,
    radius: 10,
    color: "yellow",
  });

  const leftRacket = useRef({
    x: 10,
    y: 200,
    width: 10,
    height: 100,
    color: "blue",
    velocity: 13,
  });

  const rightRacket = useRef({
    x: 980,
    y: 200,
    width: 10,
    height: 100,
    color: "red",
    velocity: 13,
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
    ballRef.current = {
      x: 500,
      y: 250,
      velocityX: 4,
      velocityY: 4,
      radius: 10,
      color: "yellow",
    };
    // setLeftRacket((prev) => ({ ...prev, y: 200 }));
    // setRightRacket((prev) => ({ ...prev, y: 200 }));
    setScores({ leftPlayer: 0, rightPlayer: 0 });
    setWinner(null);
    canvasRef.current = null;
  };

  const moveAIRacket = () => {
    // setRightRacket((prev) => {
    if (ballRef.current.velocityX < 0) return;
    const direction =
      ballRef.current.y > rightRacket.current.y + rightRacket.current.height / 2
        ? 1
        : -1;
    let newY = rightRacket.current.y + direction * rightRacket.current.velocity;
    newY = Math.max(0, Math.min(newY, 500 - rightRacket.current.height));
    rightRacket.current = { ...rightRacket.current, y: newY };
    // });
  };

  const resetPositions = () => {
    // setLeftRacket((prev) => ({
    leftRacket.current = {
      ...leftRacket.current,
      y: 200,
    };
    // }));

    rightRacket.current = {
      ...rightRacket.current,
      y: 200,
    };
  };

  const updateBallPosition = useCallback(() => {
    // setBall((prevBall) => {
    let { x, y, velocityX, velocityY } = ballRef.current;
    x += velocityX + Math.random() * 0.5;
    y += velocityY + Math.random() * 0.5;

    if (y - ballRef.current.radius <= 0) {
      y = ballRef.current.radius;
      velocityY = -velocityY;
    }
    if (y + ballRef.current.radius >= 500) {
      y = 500 - ballRef.current.radius;
      velocityY = -velocityY;
    }

    if (
      x - ballRef.current.radius <=
        leftRacket.current.x + leftRacket.current.width &&
      y >= leftRacket.current.y &&
      y <= leftRacket.current.y + leftRacket.current.height
    ) {
      velocityX = Math.abs(velocityX);
      x =
        leftRacket.current.x +
        leftRacket.current.width +
        ballRef.current.radius;
    }

    if (
      x + ballRef.current.radius >= rightRacket.current.x &&
      y >= rightRacket.current.y &&
      y <= rightRacket.current.y + rightRacket.current.height
    ) {
      velocityX = -Math.abs(velocityX);
      x = rightRacket.current.x - ballRef.current.radius;
    }
    ballRef.current = {
      ...ballRef.current,
      x: x,
      y: y,
      velocityX: velocityX,
      velocityY: velocityY,
    };

    if (x - ballRef.current.radius <= 0) {
      setScores((prevScores) => {
        if (prevScores.rightPlayer + 1 === 2) {
          setWinner("Player 1");
        }
        return {
          ...prevScores,
          rightPlayer: prevScores.rightPlayer + 1,
        };
      });
      resetPositions();
      ballRef.current = {
        ...ballRef.current,
        x: 500,
        y: 250,
      };
    } else if (x + ballRef.current.radius >= 1000) {
      setScores((prevScores) => {
        if (prevScores.leftPlayer + 1 === 2) {
          setWinner("Player 2");
        }
        return {
          ...prevScores,
          leftPlayer: prevScores.leftPlayer + 1,
        };
      });
      resetPositions();
      ballRef.current = {
        ...ballRef.current,
        x: 500,
        y: 250,
      };
    }
    // setScores(updatedScores);
  });

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  //   window.addEventListener('keyup', handleKeyUp);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //     window.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, []);

  useEffect(() => {
    const moveLeftRacket = (direction) => {
      // setLeftRacket((prev) => {
      let newY = leftRacket.current.y + direction * leftRacket.current.velocity;
      newY = Math.max(0, Math.min(newY, 500 - leftRacket.current.height));
      leftRacket.current = { ...leftRacket.current, y: newY };
      // });
    };

    const moveRightRacket = (direction) => {
      // setRightRacket((prev) => {
      let newY =
        rightRacket.current.y + direction * rightRacket.current.velocity;
      newY = Math.max(0, Math.min(newY, 500 - rightRacket.current.height));
      rightRacket.current = { ...rightRacket.current, y: newY };
      // });
    };
    const handleKeyDown = (e) => {
      keys[e.key] = true; // Set the key state to true when pressed
      if (keys["w"] || keys["W"]) {
        moveLeftRacket(-1);
      }
      if (keys["s"] || keys["S"]) {
        moveLeftRacket(1);
      }

      if (keys["ArrowUp"]) {
        moveRightRacket(-1);
      }
      if (keys["ArrowDown"]) {
        moveRightRacket(1);
      }
      
    };

    window.addEventListener("keydown", handleKeyDown);
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };
    window.addEventListener("keyup", handleKeyUp);

    const animate = () => {
      if (canvasRef.current === null) {
        console.log("Canvas is null");
        return;
      }
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, 1000, 500);
      context.fillStyle = "#000000";
      context.fillRect(0, 0, 1000, 500);

      updateBallPosition();
      context.beginPath();
      context.fillStyle = ballRef.current.color;
      context.arc(
        ballRef.current.x,
        ballRef.current.y,
        ballRef.current.radius,
        0,
        Math.PI * 2
      );
      context.fill();

      context.fillStyle = leftRacket.current.color;
      context.fillRect(
        leftRacket.current.x,
        leftRacket.current.y,
        leftRacket.current.width,
        leftRacket.current.height
      );

      context.fillStyle = rightRacket.current.color;
      context.fillRect(
        rightRacket.current.x,
        rightRacket.current.y,
        rightRacket.current.width,
        rightRacket.current.height
      );
      requestAnimationFrame(animate);
      // if (winner) return;
    };
    animate();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [canvasRef.current]);

  useEffect(() => {
    if (winner) {
      if (winner === "Player 1") {        
        matche.winner = matche.Player1;
      } else {
        matche.winner = matche.Player2;
      }
      matche.score1 = scores.leftPlayer;
      matche.score2 = scores.rightPlayer;
      localStorage.setItem('matchePlayed', JSON.stringify(matche));
      localStorage.removeItem('matche');
      navigate("/tournament/options/play-tournament");
      console.log("Winner is", winner);
    }
  }, [winner, navigate]);

  return (
    <div className="Game-render">
      <div className="player-profiles">
        <div className="player-card">
          <div className="player-name">
            <h3>{matche.Player1}</h3>
            <span className="status-dot active"></span>
          </div>
          <div className="score-container">
            <span className="score">{scores.leftPlayer}</span>
          </div>
          <div className="player-avatar">
            <img src={player1Image} alt="Player 1" />
            <div className="glow-effect"></div>
          </div>
        </div>
        
        <div className="vs-container">
          <span className="vs-text">VS</span>
        </div>
        
        <div className="player-card">
          <div className="player-name">
            <h3>{matche.Player2}</h3>
            <span className="status-dot active"></span>
          </div>
          <div className="score-container">
            <span className="score">{scores.rightPlayer}</span>
          </div>
          <div className="player-avatar">
            <img src={player2Image} alt="Player 2" />
            <div className="glow-effect"></div>
          </div>
        </div>
      </div>
      <div className="canvas-container">
        <canvas
          className="canvas-game"
          ref={canvasRef}
          width={1000}
          height={500}
        />
        <div className="match-timer">00:00</div>
      </div>
    </div>
  );
};

export default PongGame;
