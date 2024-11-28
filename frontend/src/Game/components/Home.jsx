import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Pong Game</h1>
      <button onClick={() => navigate("/local")}>Play Local</button>
      <button onClick={() => navigate("/online")}>Play Online</button>
      <button onClick={() => navigate("/bot")}>Play Bot</button>
    </div>
  );
};

export default Home;