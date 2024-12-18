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
        // <GameSocketProvider>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="local" element={<PongGame isAIEnabled={false} />} />
        <Route path="matchMaking" element={<Matchmaking isAIEnabled={false} />} />
        <Route path="online" element={<RemotePong isAIEnabled={false} />} />
        <Route path="bot" element={<PongGame isAIEnabled={true} />} />
      </Routes>
        // </GameSocketProvider>
  );
}

export default AppGame;
