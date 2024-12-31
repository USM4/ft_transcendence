import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WinPage from "./WinPage";
import Racket from "./Racket";
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";
import { UserDataContext } from "../../DashBoard/UserDataContext.jsx";

const PongGame = ({ isAIEnabled }) => {

  const {user} = useContext(UserDataContext);

  let start_time = Date.now();
  const navigate = useNavigate();
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
    velocity: isAIEnabled ?  13  : 13,
    y_ball: isAIEnabled ?  ballRef.current.y : -1 ,
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
    let another_date = Date.now();
    if (ballRef.current.velocityX < 0) return;
    let diff = another_date - start_time;
    if (diff >= 1000)
    {
      const direction =
      ballRef.current.y > rightRacket.current.y + rightRacket.current.height / 2
      ? 1
      : -1;
      let newY = rightRacket.current.y + direction * rightRacket.current.velocity;
      newY = Math.max(0, Math.min(newY, 500 - rightRacket.current.height));
      rightRacket.current = { ...rightRacket.current, y: newY };
      start_time = Date.now();
      rightRacket.current.y_ball = ballRef.current.y;
    }
    else
    {
      const direction =
      rightRacket.current.y_ball > rightRacket.current.y + rightRacket.current.height / 2
      ? 1
        : -1;
      let newY = rightRacket.current.y + direction * rightRacket.current.velocity;
      newY = Math.max(0, Math.min(newY, 500 - rightRacket.current.height));
      rightRacket.current = { ...rightRacket.current, y: newY };
    }
  };

  const resetPositions = () => {
    leftRacket.current = {
      ...leftRacket.current,
      y: 200,
    };

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
        if (prevScores.rightPlayer + 1 === 5) {
          setWinner("Player 2");
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
        if (prevScores.leftPlayer + 1 === 5) {
          setWinner(user?.username);
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
  });

  useEffect(() => {
    const moveLeftRacket = (direction) => {
    
      let newY = leftRacket.current.y + direction * leftRacket.current.velocity;
      newY = Math.max(0, Math.min(newY, 500 - leftRacket.current.height));
      leftRacket.current = { ...leftRacket.current, y: newY };
    };

    const moveRightRacket = (direction) => {
      let newY =
        rightRacket.current.y + direction * rightRacket.current.velocity;
      newY = Math.max(0, Math.min(newY, 500 - rightRacket.current.height));
      rightRacket.current = { ...rightRacket.current, y: newY };
    };
    const handleKeyDown = (e) => {
      keys[e.key] = true; // Set the key state to true when pressed
      if (keys["w"] || keys["W"]) {
        moveLeftRacket(-1);
      }
      if (keys["s"] || keys["S"]) {
        moveLeftRacket(1);
      }
      if (!isAIEnabled) {
        if (keys["ArrowUp"]) {
          moveRightRacket(-1);
        }
        if (keys["ArrowDown"]) {
          moveRightRacket(1);
        }
      }
    };

    const updateBall = () => {
        setBall((prevBall) => {
            let { x, y, velocityX, velocityY } = prevBall;

            x += velocityX;
            y += velocityY;

            if (checkCollision(prevBall, leftRacket)) {
                velocityX = Math.abs(velocityX);
            } else if (checkCollision(prevBall, rightRacket)) {
                velocityX = -Math.abs(velocityX);
            }

            if (y - ball.radius <= 0 || y + ball.radius >= canvasHeight) {
                velocityY = -velocityY;
            }

            if (x - ball.radius <= 0) {
                setScores((prevScores) => ({ ...prevScores, rightPlayer: prevScores.rightPlayer + 0.5 }));
                return resetBall();
            } else if (x + ball.radius >= canvasWidth) {
                setScores((prevScores) => ({ ...prevScores, leftPlayer: prevScores.leftPlayer + 0.5 }));
                return resetBall();
            }

            return { ...prevBall, x, y, velocityX, velocityY };
        });
    };

    const animate = () => {
      if (canvasRef.current === null) {
        // console.log("Canvas is null");
        return;
      }
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, 1000, 500);
      context.fillStyle = "#000000";
      context.fillRect(0, 0, 1000, 500);

      if (isAIEnabled) {
        moveAIRacket();
      }

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
      if (winner) return;
    };
    animate();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [canvasRef.current]);

  const draw = useCallback(
    (context) => {
    },
    [ballRef.current, leftRacket.current, rightRacket.current]
  );

  if (winner) {
    console.log("Winner is", winner);
    console.log("Scores", scores);
    return <WinPage winner={winner} resetGame={resetGame} />;
  }

  return (
    <div className="Game-render">
      <div className="player-profiles">
        <div className="player-card">
          <div className="player-name">
            <h3> {user?.username}</h3>
            <span className="status-dot active"></span>
          </div>
          <div className="score-container">
            <span className="score">{scores.leftPlayer}</span>
          </div>
          <div className="player-avatar">
            <img src={user?.avatar} alt="Player 1" />
            <div className="glow-effect"></div>
          </div>
        </div>
        
        <div className="vs-container">
          <span className="vs-text">VS</span>
        </div>
        
        <div className="player-card">
          <div className="player-name">
            <h3>{isAIEnabled ? "MJININA hh" : "Player 2"}</h3>
            <span className="status-dot active"></span>
          </div>
          <div className="score-container">
            <span className="score">{scores.rightPlayer}</span>
          </div>
          <div className="player-avatar">
            <img src={player2Image} alt="Player 2" />
            <div className="glow-effect"></div>
          </div>

          <div className='canvas-container'><Canvas width={canvasWidth} height={canvasHeight} draw={draw} /></div>
          <h3>Player 1: W to go up, S to go down</h3>
          <h3>Player 2: Up arrow to go up, Down arrow to go down</h3>
        </div>
        </div>
        </div>
    );
};

export default PongGame;