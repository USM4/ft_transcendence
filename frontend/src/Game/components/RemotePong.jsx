import React, { useContext, useState, useEffect, useRef } from "react";
import { GameSocketContext } from "./GameSocketContext"; 
import WaitingOpponent from "./WaitingOpponent"; 
import player1Image from "../../../public/skull.jpeg";
import player2Image from "../../../public/realone.png";
import { UserDataContext } from "../../DashBoard/UserDataContext";

const RemotePong = ({ }) => {
  const { socket , player} = useContext(GameSocketContext); 
  const canvasRef = useRef(null);
  const { user } = useContext(UserDataContext);
  if(localStorage.getItem("gameState") === null)
    localStorage.setItem("gameState", "Playing");
  const [gameState, setGameState] = useState(localStorage.getItem("gameState"));

  const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
  const [winner, setWinner] = useState(null);


  const wsRef = useRef(null); 

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
    score: 0,
  });

  const rightRacket = useRef({
    x: 980,
    y: 200,
    width: 10,
    height: 100,
    color: "red",
    velocity:13,
    score: 0,
  });

  const keyState = useRef({
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
  });

  useEffect(() => {
    if (socket) {
      
      wsRef.current = socket;

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established.");
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      /*******************************--L3ROSA--***********************************************/
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
      
        if (data.type === "game_state_update") {
          const gameState = data.message;
          // console.log("Game state:", gameState);
          // setPlayer1(gameState.pleft);
          // setPlayer2(gameState.pright);
          leftRacket.current = gameState.pleft;
          rightRacket.current = gameState.pright;
          ballRef.current = gameState.ball;
          // console.log("Game state: x BALL", gameState.ball.velocityX);
          // console.log("Game state: Y BALL", gameState.ball.velocityY);
            localStorage.setItem("gameState", "Playing");
            setGameState("Playing");
            setScores({ leftPlayer: gameState.pleft.score, rightPlayer: gameState.pright.score });
          }
          else if (data.type === "waiting-for-players")
            {
              localStorage.setItem("gameState", "Waiting");
              setGameState("Waiting");
            }
            else if (data.type === "game_over")
              {
              console.log("Game Over ++++++++++++++++++");
              localStorage.setItem("gameState", "Waiting");
              setGameState("Waiting");
            // setWinner(data.winner);
          }
            
      /***************************************************************************************/
      
      return () => {
        if (wsRef.current) {
          console.log("WebSocket connection closed 5.");
          wsRef.current.close();
        }
      };
    }
  }
}, [socket]);


  
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    if (["w", "s", "arrowup", "arrowdown"].includes(key) &&!keyState.current[key]) {
      const message = {
        type: "key_press",
        key: key,
      };

      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        // console.log("Sending key press:", message.key); 
        wsRef.current.send(JSON.stringify(message)); 
        //ila wrrrekty 3la l paddles bjoj fde99a atkhessr 
        // keyState.current[key] = true
      } else {
        console.error("WebSocket is not open, message not sent");
      }
    }
  };

  const handleKeyUp = (e) => {
    const key = e.key.toLowerCase();
    // console.log("Key up:", key); 

    if ( ["w", "s", "arrowup", "arrowdown"].includes(key) && keyState.current[key]) {
      const message = {
        type: "key_release",
        key: key,
      };

      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        // console.log("Sending key release:", message.key); 
        wsRef.current.send(JSON.stringify(message)); 
        //ila wrrrekty 3la l paddles bjoj fde99a atkhessr
        // keyState.current[key] = false; 
      } else {
        console.error("WebSocket is not open, message not sent");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
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
    };

    animate();
  }, []);

  return (
    <div className="Game-render">
      {localStorage.getItem("gameState") === "Waiting" && <WaitingOpponent isVisible={true} />}
      {localStorage.getItem("gameState") === "Playing" && (
        <>
          <div className="player-profiles">
            <div className="player-card">
              <div className="player-name">
                <h3>{user.username}</h3>
                <span className="status-dot active"></span>
              </div>
              <div className="score-container">
                <span className="score">{scores.leftPlayer}</span>
              </div>
              <div className="player-avatar">
                <img src={user.avatar} alt="Player 1" />
                <div className="glow-effect"></div>
              </div>
            </div>

            <div className="vs-container">
              <span className="vs-text">VS</span>
            </div>

            <div className="player-card">
              <div className="player-name">
                <h3>{player.name}</h3>
                <span className="status-dot active"></span>
              </div>
              <div className="score-container">
                <span className="score">{scores.rightPlayer}</span>
              </div>
              <div className="player-avatar">
                <img src={player.avatar} alt="Player 2" />
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
        </>
      )}
    </div>
  );
};

export default RemotePong;
