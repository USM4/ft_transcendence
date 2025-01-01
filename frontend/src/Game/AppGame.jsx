import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PongGame from "./components/PongGame";
import WinPage from "./components/WinPage";
import RemotePong from "./components/RemotePong";
import Matchmaking from "./components/Matchmaking.jsx";
import { UserDataContext } from "../DashBoard/UserDataContext.jsx";
import FPlayer from "./components/multiplayer";

function AppGame() {
  return (
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="local" element={<PongGame isAIEnabled={false} />} />
          <Route path="matchMaking" element={<Matchmaking isAIEnabled={false} />} />
          <Route path="online" element={<RemotePong isAIEnabled={false} />} />
          <Route path="bot" element={<PongGame isAIEnabled={true} />} />
          <Route path="MultiPlayer" element={<FPlayer />} />
      </Routes>
  );
}

export default AppGame;
