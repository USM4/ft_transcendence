import React, { useCallback, useState, useEffect } from 'react';
import Canvas from './Canvas';
import WinPage from './WinPage';
import player2Image from "../../../public/realone.png";
import player1Image from "../../../public/skull.jpeg";

const PongGame = ({ canvasWidth = 1000, canvasHeight = 500 }) => {
    const racketSpeed = 6;
    const maxScore = 5;

    const [ball, setBall] = useState({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        velocityX: 6,
        velocityY: 6,
        radius: 10,
        color: 'yellow',
    });

    const [leftRacket, setLeftRacket] = useState({
        x: 10,
        y: canvasHeight / 2 - 50,
        width: 10,
        height: 100,
        color: 'blue',
    });

    const [rightRacket, setRightRacket] = useState({
        x: canvasWidth - 20,
        y: canvasHeight / 2 - 50,
        width: 10,
        height: 100,
        color: 'red',
    });

    const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
    const [winner, setWinner] = useState(null);
    const [keys, setKeys] = useState({});

    const handleKeyDown = (event) => setKeys((prev) => ({ ...prev, [event.key]: true }));
    const handleKeyUp = (event) => setKeys((prev) => ({ ...prev, [event.key]: false }));

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const updateRackets = () => {
        setLeftRacket((prev) => {
            let newY = prev.y;
            if (keys['w'] && newY > 0) newY -= racketSpeed;
            if (keys['s'] && newY + prev.height < canvasHeight) newY += racketSpeed;
            return { ...prev, y: newY };
        });

        setRightRacket((prev) => {
            let newY = prev.y;
            if (keys['ArrowUp'] && newY > 0) newY -= racketSpeed;
            if (keys['ArrowDown'] && newY + prev.height < canvasHeight) newY += racketSpeed;
            return { ...prev, y: newY };
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

    const resetBall = () => ({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        velocityX: Math.random() > 0.5 ? 4 : -4,
        velocityY: Math.random() > 0.5 ? 4 : -4,
        radius: 10,
        color: '#fff',
    });

    const checkWinner = () => {
        if (scores.leftPlayer >= maxScore) setWinner('Left Player');
        if (scores.rightPlayer >= maxScore) setWinner('Right Player');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateRackets();
            updateBall();
            checkWinner();
        }, 16);
        return () => clearInterval(interval);
    });

    const draw = useCallback(
        (context) => {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvasWidth, canvasHeight);

            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fillStyle = ball.color;
            context.fill();

            context.fillStyle = leftRacket.color;
            context.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);

            context.fillStyle = rightRacket.color;
            context.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);
        },
        [ball, leftRacket, rightRacket]
    );

    if (winner) {
        return <WinPage winner={winner} text={"wins!"} resetGame={() => window.location.reload()} />;
    }

    return (
        <div className="Game-render">
          <div className="player-profiles">
            <div className="player-card">
              <div className="player-name">
                <h3>Player 1</h3>
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

            <div className="player-card">
              <div className="player-name">
                <h3>Player 2</h3>
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

          <div className='canvas-container'><Canvas width={canvasWidth} height={canvasHeight} draw={draw} /></div>
          <h3>Player 1: W to go up, S to go down</h3>
          <h3>Player 2: Up arrow to go up, Down arrow to go down</h3>
        </div>
    );
};

export default PongGame;