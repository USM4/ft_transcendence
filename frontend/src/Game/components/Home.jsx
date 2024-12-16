import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="Game-main-Page">
      <h1>Pong Game</h1>
      <button onClick={() => navigate("local")}>Play Local</button>
      <button onClick={() => navigate("matchMaking")}>Play Online</button>
      <button onClick={() => navigate("bot")}>Play Bot</button>
    </div>
  );
};

export default Home;