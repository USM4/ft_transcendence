import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="Game-main-Page">
      <h1>Pong Game</h1>
      <button onClick={() => navigate("2Player")}>2 Player</button>
      <button onClick={() => navigate("4Player")}>4 Player</button>
      <button onClick={() => navigate("vsbot")}>vs Bot</button>
    </div>
  );
};

export default Home;