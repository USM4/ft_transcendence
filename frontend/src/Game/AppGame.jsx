import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gamepage from './Gamepage';
import PlayBotPage from './PlayBotPage';
import PlayFriendPage from './PlayFriendPage';
import Layout from './Layout';

const AppGame = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route path='/game' element={<Gamepage />} />
            <Route path="/game/play-bot" element={<PlayBotPage />} />
            <Route path="/game/play-friend" element={<PlayFriendPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppGame;
