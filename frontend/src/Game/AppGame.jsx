import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RemotePong from "./components/RemotePong";
import { GameSocketProvider } from "./components/GameSocketContext.jsx";
import PongGame from "./components/PongGame";
import FPlayer from "./components/4Player";
import Matchmaking from "./components/Matchmaking";
import WinPage from "./components/WinPage";

function AppGame() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="local" element={<PongGame isAIEnabled={false} />} />
      <Route path="matchMaking" element={<Matchmaking isAIEnabled={false} />} />
      <Route path="online" element={<RemotePong isAIEnabled={false} />} />
      <Route path="bot" element={<PongGame isAIEnabled={true} />} />
      <Route path="4Player" element={<FPlayer />} />
    </Routes>
  );
}

export default AppGame;
