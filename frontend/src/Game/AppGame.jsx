import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PongGame from "./components/PongGame";
import FPlayer from "./components/4Player";

function AppGame() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="local" element={<PongGame isAIEnabled={false} />} />
      <Route path="2vs2" element={<FPlayer />} />
      <Route path="bot" element={<PongGame isAIEnabled={true} />} />
    </Routes>
  );
}

export default AppGame;
