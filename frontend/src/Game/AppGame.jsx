import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PongGame from "./components/PongGame";
import { GameSocketProvider } from "./components/GameSocketContext.jsx";

import WinPage from "./components/WinPage";
import RemotePong from "./components/RemotePong";
import Matchmaking from "./components/Matchmaking.jsx";

function AppGame() {
  return (
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="local" element={<PongGame isAIEnabled={false} />} />
        <Route path="matchMaking" element={<GameSocketProvider><Matchmaking isAIEnabled={false} /></GameSocketProvider>} />
        <Route path="online" element={<GameSocketProvider><RemotePong isAIEnabled={false} /></GameSocketProvider>} />
        <Route path="bot" element={<PongGame isAIEnabled={true} />} />
      </Routes>
  );
}

export default AppGame;
