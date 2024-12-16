import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PongGame from "./components/PongGame";
import FPlayer from "./components/4Player";

function AppGame() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="2Player" element={<PongGame isAIEnabled={false} />} />
      <Route path="4Player" element={<FPlayer />} />
      <Route path="vsbot" element={<PongGame isAIEnabled={true} />} />
    </Routes>
  );
}

export default AppGame;
