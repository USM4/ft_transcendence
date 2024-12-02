import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PongGame from "./components/PongGame";
import Matchmaking from "./components/Matchmaking";
import WinPage from "./components/WinPage";

function AppGame() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="local" element={<PongGame isAIEnabled={false} />} />
      <Route path="online" element={<Matchmaking />} />
      <Route path="bot" element={<PongGame isAIEnabled={true} />} />
    </Routes>
  );
}

export default AppGame;
