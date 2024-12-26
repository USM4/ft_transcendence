import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WinPage from "./WinPage";
import Loser from "./Loser";
// import { GameSocketContext } from "./GameSocketContext";
import Swal from "sweetalert2";
import WaitingOpponent from "./WaitingOpponent"; 
import player3Image from "../../../public/anonyme.png";

import { UserDataContext } from "../../DashBoard/UserDataContext";
import { GameSocketContext } from "./GameSocketContext";

const RemotePong = () => {
  const canvasRef = useRef(null);
  const { user } = useContext(UserDataContext);
  if(localStorage.getItem("gameState") === null)
    localStorage.setItem("gameState", "Playing");
  const location = useLocation();
  const { players} = location.state || {
  };
  const [gameState, setGameState] = useState(localStorage.getItem("gameState"));

  const [scores, setScores] = useState({ leftPlayer: 0, rightPlayer: 0 });
  const [winner, setWinner] = useState(false);
  const [loser , setLoser] = useState(false);
  const navigate = useNavigate();

  const {wsRef, message} = useContext(GameSocketContext);

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

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

useEffect(() => {
  if (wsRef.current && message) {
      const socket = wsRef.current;
      
      //console.log("+++++++++++++DATA+++++++++++++++++") 
          const data = message;
          //console.log("+++++++++++++DATA+++++++++++++++++", data)
          switch(data.type) {
              case "game_state_update":
                  const gameState = data.message;
                  leftRacket.current = gameState.pleft;
                  rightRacket.current = gameState.pright;
                  ballRef.current = gameState.ball;
                  localStorage.setItem("gameState", "Playing");
                  setGameState("Playing");
                  break;
                  
              case "waiting_for_players":
                  localStorage.setItem("gameState", "Waiting");
                  setGameState("Waiting");
                  break;
                  
              case "score_update":
                setScores({ leftPlayer: data.message.score.player1, rightPlayer: data.message.score.player2 })
              case "game_over":
                  console.log("--------------game over data-------------",data);
                  const resetGame = () => {
                    navigate('tournament/options/game');
                  }
                  if (data.winner === user.username)
                  {
                      setWinner(true);
                      console.log("Winner is", data.winner);
                    }
                    else if(data.loser === user.username)
                    {
                      setLoser(true);
                      console.log("Loser is", data.loser);
                      // return <Loser loser={data.loser}/>;
                    }
                  break;
              case "player_disconnected":
                Swal.fire({
                  title: 'Ooops!',
                  text: "Your opponent has disconnected !",
                  icon: 'warning',
                  showCancelButton: false,
                  confirmButtonText: "Find another opponent",
                  confirmButtonColor: '#28a745',
                  cancelButtonColor: '#dc3545',
                  background: '#000',
                  color: '#fff',
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    navigate("/tournament/options/game");
                  }
                });
              default:
          
          }
  }
}, [wsRef, message]);


const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    
    if (["w", "s", "arrowup", "arrowdown"].includes(key) &&!keyState.current[key]) {
      const message = {
        type: "key_press",
        key: key,
      };


      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
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
    
    if ( ["w", "s", "arrowup", "arrowdown"].includes(key) && keyState.current[key]) {
      const message = {
        type: "key_release",
        key: key,
      };
      
      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
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
      {winner && (
        <WinPage
          winner={user.username}
          resetGame={() => {
            navigate("/tournament/options/game");
          }}
        />
      )}
      {loser && (
        <Loser
          loser={user.username}
        />
      )}
    
              
      {localStorage.getItem("gameState") === "Waiting" && <WaitingOpponent isVisible={true} />}
      {localStorage.getItem("gameState") === "Playing" && (
        <>
          <div className="player-profiles">
            <div className="player-card">
              <div className="player-name">
                <h3>{players.user1.username}</h3>
                <span className="status-dot active"></span>
              </div>
              <div className="score-container">
                <span className="score">{scores.leftPlayer}</span>
              </div>
              <div className="player-avatar">
                <img src={players.user1.avatar || player3Image} alt="Player 1" />
                <div className="glow-effect"></div>
              </div>
            </div>

            <div className="vs-container">
              <span className="vs-text">VS</span>
            </div>

            <div className="player-card">
              <div className="player-name">
                <h3>{players.user2.username}</h3>
                <span className="status-dot active"></span>
              </div>
              <div className="score-container">
                <span className="score">{scores.rightPlayer}</span>
              </div>
              <div className="player-avatar">
                <img src={players.user2.avatar || player3Image} alt="Player 2" />
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
            <div className="match-timer">
            {formatTime(seconds)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RemotePong;
