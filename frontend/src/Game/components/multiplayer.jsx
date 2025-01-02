import React, { useCallback, useState, useEffect } from "react";
import Canvas from "./Canvas";
import Loser from "./Loser";
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";

const FPlayer = ({ canvasWidth = 600, canvasHeight = 600 }) => {
  const racketSpeed = 10;
  const maxScore = 5;
  const safetyMargin = 10;

  const [ball, setBall] = useState({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    velocityX: 4,
    velocityY: 4,
    radius: 10,
    color: "yellow",
  });

  const [leftRacket, setLeftRacket] = useState({
    x: 10,
    y: canvasHeight / 2 - 50,
    width: 10,
    height: 100,
    color: "blue",
  });

  const [rightRacket, setRightRacket] = useState({
    x: canvasWidth - 20,
    y: canvasHeight / 2 - 50,
    width: 10,
    height: 100,
    color: "blue",
  });

  const [topRacket, setTopRacket] = useState({
    x: canvasWidth / 2 - 50,
    y: 10,
    width: 100,
    color: "blue",
    height: 10,
  });

  const [botRacket, setBotRacket] = useState({
    x: canvasWidth / 2 - 50,
    y: canvasHeight - 20,
    width: 100,
    height: 10,
    color: "blue",
  });

  const [scores, setScores] = useState({
    leftPlayer: 5,
    rightPlayer: 5,
    topPlayer: 5,
    botPlayer: 5,
  });
  const [winner, setWinner] = useState(null);

  const [keys, setKeys] = useState({});

  const [activePlayers, setActivePlayers] = useState({
    left: true,
    right: true,
    top: true,
    bottom: true,
  });

  const handleKeyDown = (event) =>
    setKeys((prev) => ({ ...prev, [event.key]: true }));
  const handleKeyUp = (event) =>
    setKeys((prev) => ({ ...prev, [event.key]: false }));

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const checkRacketOverlap = (racket1, racket2) => {
    return (
      racket1.x < racket2.x + racket2.width &&
      racket1.x + racket1.width > racket2.x &&
      racket1.y < racket2.y + racket2.height &&
      racket1.y + racket1.height > racket2.y
    );
  };

  const resetGame = () => {
    setLeftRacket((prev) => ({ ...prev, y: 250 }));
    setRightRacket((prev) => ({ ...prev, y: 250 }));
    setTopRacket((prev) => ({ ...prev, x: 250 }));
    setBotRacket((prev) => ({ ...prev, x: 250 }));
    setScores({ leftPlayer: 5, rightPlayer: 5, topPlayer: 5, botPlayer: 5 });
    setBall(resetBall());
    setWinner(null);
  };

  const updateRackets = () => {
    const cornerSquareSize = 30;
    const corners = [
      { x: 0, y: 0, width: cornerSquareSize, height: cornerSquareSize },
      {
        x: canvasWidth - cornerSquareSize,
        y: 0,
        width: cornerSquareSize,
        height: cornerSquareSize,
      },
      {
        x: 0,
        y: canvasHeight - cornerSquareSize,
        width: cornerSquareSize,
        height: cornerSquareSize,
      },
      {
        x: canvasWidth - cornerSquareSize,
        y: canvasHeight - cornerSquareSize,
        width: cornerSquareSize,
        height: cornerSquareSize,
      },
    ];

    const checkSquareOverlap = (racket) => {
      return corners.some(
        (square) =>
          racket.x < square.x + square.width &&
          racket.x + racket.width > square.x &&
          racket.y < square.y + square.height &&
          racket.y + racket.height > square.y
      );
    };

    setLeftRacket((prev) => {
      let newY = prev.y;
      if (keys["w"] && newY > 0) {
        const newRacket = { ...prev, y: newY - racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newY -= racketSpeed;
        }
      }
      if (keys["s"] && newY + prev.height < canvasHeight) {
        const newRacket = { ...prev, y: newY + racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newY += racketSpeed;
        }
      }
      return { ...prev, y: newY };
    });

    setRightRacket((prev) => {
      let newY = prev.y;
      if (keys["-"] && newY > 0) {
        const newRacket = { ...prev, y: newY - racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newY -= racketSpeed;
        }
      }
      if (keys["+"] && newY + prev.height < canvasHeight) {
        const newRacket = { ...prev, y: newY + racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newY += racketSpeed;
        }
      }
      return { ...prev, y: newY };
    });

    setTopRacket((prev) => {
      let newX = prev.x;
      if (keys["Alt"] && newX > 0) {
        const newRacket = { ...prev, x: newX - racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newX -= racketSpeed;
        }
      }
      if (keys[" "] && newX + prev.width < canvasWidth) {
        const newRacket = { ...prev, x: newX + racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newX += racketSpeed;
        }
      }
      return { ...prev, x: newX };
    });

    setBotRacket((prev) => {
      let newX = prev.x;
      if (keys["ArrowLeft"] && newX > 0) {
        const newRacket = { ...prev, x: newX - racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newX -= racketSpeed;
        }
      }
      if (keys["ArrowRight"] && newX + prev.width < canvasWidth) {
        const newRacket = { ...prev, x: newX + racketSpeed };
        if (!checkSquareOverlap(newRacket)) {
          newX += racketSpeed;
        }
      }
      return { ...prev, x: newX };
    });
  };

  const checkCollision = (ball, racket) => {
    return (
      ball.x + ball.radius > racket.x &&
      ball.x - ball.radius < racket.x + racket.width &&
      ball.y + ball.radius > racket.y &&
      ball.y - ball.radius < racket.y + racket.height
    );
  };
  const updateBall = () => {
    setBall((prevBall) => {
      let { x, y, velocityX, velocityY } = prevBall;

      x += velocityX;
      y += velocityY;

      const randomizeAngle = () => (Math.random() * Math.PI) / 6;
      const randomizeSpeed = () => 6;

      const cornerSquareSize = 30;
      const corners = [
        { x: 0, y: 0, width: cornerSquareSize, height: cornerSquareSize },
        {
          x: canvasWidth - cornerSquareSize,
          y: 0,
          width: cornerSquareSize,
          height: cornerSquareSize,
        },
        {
          x: 0,
          y: canvasHeight - cornerSquareSize,
          width: cornerSquareSize,
          height: cornerSquareSize,
        },
        {
          x: canvasWidth - cornerSquareSize,
          y: canvasHeight - cornerSquareSize,
          width: cornerSquareSize,
          height: cornerSquareSize,
        },
      ];

      for (const corner of corners) {
        if (
          x + ball.radius > corner.x &&
          x - ball.radius < corner.x + corner.width &&
          y + ball.radius > corner.y &&
          y - ball.radius < corner.y + corner.height
        ) {
          const overlapX =
            x < corner.x
              ? x + ball.radius - corner.x
              : corner.x + corner.width - (x - ball.radius);
          const overlapY =
            y < corner.y
              ? y + ball.radius - corner.y
              : corner.y + corner.height - (y - ball.radius);

          if (overlapX < overlapY) {
            velocityX = -velocityX;
            x =
              x < corner.x
                ? corner.x - ball.radius
                : corner.x + corner.width + ball.radius;
          } else {
            velocityY = -velocityY;
            y =
              y < corner.y
                ? corner.y - ball.radius
                : corner.y + corner.height + ball.radius;
          }
        }
      }

      if (checkCollision(prevBall, leftRacket)) {
        const angle = randomizeAngle();
        velocityX = Math.cos(angle) * randomizeSpeed();
        velocityY += Math.sin(angle);
        x = leftRacket.x + leftRacket.width + ball.radius + 1;
      } else if (checkCollision(prevBall, rightRacket)) {
        const angle = randomizeAngle();
        velocityX = -Math.cos(angle) * randomizeSpeed();
        velocityY += Math.sin(angle);
        x = rightRacket.x - ball.radius - 1;
      } else if (checkCollision(prevBall, topRacket)) {
        const angle = randomizeAngle();
        velocityY = Math.cos(angle) * randomizeSpeed();
        velocityX += Math.sin(angle);
        y = topRacket.y + topRacket.height + ball.radius + 1;
      } else if (checkCollision(prevBall, botRacket)) {
        const angle = randomizeAngle();
        velocityY = -Math.cos(angle) * randomizeSpeed();
        velocityX += Math.sin(angle);
        y = botRacket.y - ball.radius - 1;
      }

      if (x - ball.radius <= 0) {
        handleScore("leftPlayer");
        return resetBall();
      } else if (x + ball.radius >= canvasWidth) {
        handleScore("rightPlayer");
        return resetBall();
      } else if (y - ball.radius <= 0) {
        handleScore("topPlayer");
        return resetBall();
      } else if (y + ball.radius >= canvasHeight) {
        handleScore("botPlayer");
        return resetBall();
      }

      return { ...prevBall, x, y, velocityX, velocityY };
    });
  };

  const handleScore = (player) => {
    setScores((prevScores) => {
      const newScores = { ...prevScores, [player]: prevScores[player] - 0.5 };

      if (newScores[player] <= 0) {
        const scoresArray = Object.entries(newScores);
        const maxScore = Math.min(...scoresArray.map(([_, score]) => score));
        const winnerPlayer = scoresArray.find(
          ([_, score]) => score === maxScore
        )?.[0];

        setWinner(winnerPlayer);
      }

      return newScores;
    });
  };

  const resetBall = () => {
    const angle = Math.random() * 2 * Math.PI;
    const speed = 6;

    return {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed,
      radius: 10,
      color: "yellow",
    };
  };

  useEffect(() => {
    let interval;
    if (!winner) {
      interval = setInterval(() => {
        updateRackets();
        updateBall();
      }, 12);
    }
    return () => clearInterval(interval);
  }, [updateRackets, updateBall]);

  const draw = useCallback(
    (context) => {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.fillStyle = "#000";
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      const cornerSquareSize = 30;
      const corners = [
        { x: 0, y: 0, color: "red" },
        { x: canvasWidth - cornerSquareSize, y: 0, color: "red" },
        { x: 0, y: canvasHeight - cornerSquareSize, color: "red" },
        {
          x: canvasWidth - cornerSquareSize,
          y: canvasHeight - cornerSquareSize,
          color: "red",
        },
      ];

      corners.forEach((corner) => {
        context.fillStyle = corner.color;
        context.fillRect(
          corner.x,
          corner.y,
          cornerSquareSize,
          cornerSquareSize
        );
      });

      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fillStyle = ball.color;
      context.fill();

      context.fillStyle = leftRacket.color;
      context.fillRect(
        leftRacket.x,
        leftRacket.y,
        leftRacket.width,
        leftRacket.height
      );

      context.fillStyle = rightRacket.color;
      context.fillRect(
        rightRacket.x,
        rightRacket.y,
        rightRacket.width,
        rightRacket.height
      );

      context.fillStyle = topRacket.color;
      context.fillRect(
        topRacket.x,
        topRacket.y,
        topRacket.width,
        topRacket.height
      );

      context.fillStyle = botRacket.color;
      context.fillRect(
        botRacket.x,
        botRacket.y,
        botRacket.width,
        botRacket.height
      );
    },
    [
      ball,
      leftRacket,
      rightRacket,
      topRacket,
      botRacket,
      canvasWidth,
      canvasHeight,
    ]
  );

  if (winner) {
    return <Loser loser={winner} resetGame={resetGame} />;
  }

  return (
    <div className="FGame-render">
      <div className="top-row">
        <div className="player-profiles">
          <div className="player-card">
            <div className="player-name">
              <h3>leftPlayer</h3>
              <span className="status-dot active"></span>
            </div>
            <h3>UP: W DWN: S</h3>
            <div className="score-container">
              <span className="score">{scores.leftPlayer}</span>
            </div>
            <div className="player-avatar">
              <img src={player1Image} alt="Player 1" />
              <div className="glow-effect"></div>
            </div>
          </div>

          <div className="player-card">
            <div className="player-name">
              <h3>topPlayer</h3>
              <span className="status-dot active"></span>
            </div>
            <h3>LT: alt RT: space</h3>
            <div className="score-container">
              <span className="score">{scores.topPlayer}</span>
            </div>
            <div className="player-avatar">
              <img src={player1Image} alt="Player 1" />
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="Fcanvas-container">
        <Canvas width={canvasWidth} height={canvasHeight} draw={draw} />
      </div>
      <div className="bot-row">
        <div className="player-profiles">
          <div className="player-card">
            <div className="player-name">
              <h3>botPlayer</h3>
              <span className="status-dot active"></span>
            </div>
            <h3>LT: ArrowLeft RT: ArrowRight</h3>
            <div className="score-container">
              <span className="score">{scores.botPlayer}</span>
            </div>
            <div className="player-avatar">
              <img src={player1Image} alt="Player 1" />
              <div className="glow-effect"></div>
            </div>
          </div>

          <div className="player-card">
            <div className="player-name">
              <h3>rightPlayer</h3>
              <span className="status-dot active"></span>
            </div>
            <h3>UP: - DWN: +</h3>
            <div className="score-container">
              <span className="score">{scores.rightPlayer}</span>
            </div>
            <div className="player-avatar">
              <img src={player2Image} alt="Player 2" />
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FPlayer;
