import React, { useCallback, useState, useEffect } from 'react';
import Canvas from './Canvas';
import WinPage from './WinPage';

const FPlayer = ({ canvasWidth = 600, canvasHeight = 600 }) => {
    const racketSpeed = 6;
    const maxScore = 5;
    const safetyMargin = 10;

    const [ball, setBall] = useState({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        velocityX: 4,
        velocityY: 4,
        radius: 10,
        color: '#fff',
    });

    const [leftRacket, setLeftRacket] = useState({
        x: 1,
        y: canvasHeight / 2 - 50,
        width: 10,
        height: 100,
        color: '#0af3c8',
    });

    const [rightRacket, setRightRacket] = useState({
        x: canvasWidth - 11,
        y: canvasHeight / 2 - 50,
        width: 10,
        height: 100,
        color: '#f39c12',
    });

    const [topRacket, setTopRacket] = useState({
        x: canvasWidth / 2 - 50,
        y: 1,
        width: 100,
        height: 10,
        color: '#e74c3c',
    });

    const [botRacket, setBotRacket] = useState({
        x: canvasWidth / 2 - 50,
        y: canvasHeight - 11,
        width: 100,
        height: 10,
        color: '#9b59b6',
    });

    const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0, topPlayer: 0, botPlayer: 0 });
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
        setScores({ leftPlayer: 0, rightPlayer: 0 });
        setWinner(null);
      };

    const updateRackets = () => {
        setLeftRacket((prev) => {
            let newY = prev.y;
            if (keys['w'] && newY > 0) {
                const newRacket = { ...prev, y: newY - racketSpeed };
                if (!checkRacketOverlap(newRacket, rightRacket) && !checkRacketOverlap(newRacket, topRacket) && !checkRacketOverlap(newRacket, botRacket)) {
                    newY -= racketSpeed;
                }
            }
            if (keys['s'] && newY + prev.height < canvasHeight) {
                const newRacket = { ...prev, y: newY + racketSpeed };
                if (!checkRacketOverlap(newRacket, rightRacket) && !checkRacketOverlap(newRacket, topRacket) && !checkRacketOverlap(newRacket, botRacket)) {
                    newY += racketSpeed;
                }
            }
            return { ...prev, y: newY };
        });

        setRightRacket((prev) => {
            let newY = prev.y;
            if (keys['o'] && newY > 0) {
                const newRacket = { ...prev, y: newY - racketSpeed };
                if (!checkRacketOverlap(newRacket, leftRacket) && !checkRacketOverlap(newRacket, topRacket) && !checkRacketOverlap(newRacket, botRacket)) {
                    newY -= racketSpeed;
                }
            }
            if (keys['l'] && newY + prev.height < canvasHeight) {
                const newRacket = { ...prev, y: newY + racketSpeed };
                if (!checkRacketOverlap(newRacket, leftRacket) && !checkRacketOverlap(newRacket, topRacket) && !checkRacketOverlap(newRacket, botRacket)) {
                    newY += racketSpeed;
                }
            }
            return { ...prev, y: newY };
        });

        setTopRacket((prev) => {
            let newX = prev.x;
            if (keys['x'] && newX > 0) {
                const newRacket = { ...prev, x: newX - racketSpeed };
                if (!checkRacketOverlap(newRacket, rightRacket) && !checkRacketOverlap(newRacket, leftRacket) && !checkRacketOverlap(newRacket, botRacket)) {
                    newX -= racketSpeed;
                }
            }
            if (keys['c'] && newX + prev.width < canvasWidth) {
                const newRacket = { ...prev, x: newX + racketSpeed };
                if (!checkRacketOverlap(newRacket, rightRacket) && !checkRacketOverlap(newRacket, leftRacket) && !checkRacketOverlap(newRacket, botRacket)) {
                    newX += racketSpeed;
                }
            }
            return { ...prev, x: newX };
        });

        setBotRacket((prev) => {
            let newX = prev.x;
            if (keys['n'] && newX > 0) {
                const newRacket = { ...prev, x: newX - racketSpeed };
                if (!checkRacketOverlap(newRacket, rightRacket) && !checkRacketOverlap(newRacket, leftRacket) && !checkRacketOverlap(newRacket, topRacket)) {
                    newX -= racketSpeed;
                }
            }
            if (keys['m'] && newX + prev.width < canvasWidth) {
                const newRacket = { ...prev, x: newX + racketSpeed };
                if (!checkRacketOverlap(newRacket, rightRacket) && !checkRacketOverlap(newRacket, leftRacket) && !checkRacketOverlap(newRacket, topRacket)) {
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
                setScores((prevScores) => ({ ...prevScores, rightPlayer: prevScores.rightPlayer + 0.5 }));
                return resetBall();
            } else if (x + ball.radius >= canvasWidth) {
                setScores((prevScores) => ({ ...prevScores, leftPlayer: prevScores.leftPlayer + 0.5 }));
                return resetBall();
            } else if (y - ball.radius <= 0) {
                setScores((prevScores) => ({ ...prevScores, botPlayer: prevScores.botPlayer + 0.5 }));
                return resetBall();
            } else if (y + ball.radius >= canvasHeight) {
                setScores((prevScores) => ({ ...prevScores, topPlayer: prevScores.topPlayer + 0.5 }));
                return resetBall();
            }

            return { ...prevBall, x, y, velocityX, velocityY };
        });
    };

    const resetBall = () => {
        const angle = Math.random() * 2 * Math.PI;
        const speed = 6
    
        return {
            x: canvasWidth / 2,
            y: canvasHeight / 2,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            radius: 10,
            color: '#fff',
        };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateRackets();
            updateBall();
        }, 16);
        return () => clearInterval(interval);
    }, [updateRackets, updateBall]);

    const draw = useCallback(
        (context) => {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.fillStyle = '#326da4';
            context.fillRect(0, 0, canvasWidth, canvasHeight);

            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fillStyle = ball.color;
            context.fill();

            context.fillStyle = leftRacket.color;
            context.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);

            context.fillStyle = rightRacket.color;
            context.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);

            context.fillStyle = topRacket.color;
            context.fillRect(topRacket.x, topRacket.y, topRacket.width, topRacket.height);

            context.fillStyle = botRacket.color;
            context.fillRect(botRacket.x, botRacket.y, botRacket.width, botRacket.height);
        },
        [ball, leftRacket, rightRacket, topRacket, botRacket, canvasWidth, canvasHeight]
    );

    if (winner) {
        return <WinPage winner={winner} resetGame={resetGame} />;
      }

    return (
        <div className="FGame">
            <div className="score top-score">Top: {scores.topPlayer}</div>
            <div className="canvas-containerF">
                <div className="score left-score">Left: {scores.leftPlayer}</div>
                <Canvas width={canvasWidth} height={canvasHeight} draw={draw} />
                <div className="score right-score">Right: {scores.rightPlayer}</div>
            </div>
            <div className="score bottom-score">Bottom: {scores.botPlayer}</div>
        </div>
    );
};

export default FPlayer;
