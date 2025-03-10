import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import Chat from './Chat/Chat.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import NavbarSideBar from './DashBoard/NavBarSideBar.jsx'
import Dashboard from './DashBoard/Dashboard.jsx';
import Profile from './DashBoard/Profile.jsx'
import ProfileSettings from'./DashBoard/ProfileSettings.jsx';
import HomePage from './HomePage.jsx';
import AboutSection from './About.jsx';
import HowToPlay from './HowToPlay.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import UserDataProvider from './DashBoard/UserDataContext.jsx'
import SocketContextProvider from './DashBoard/SocketContext.jsx';
import { Toaster } from 'react-hot-toast';
import TwoFa from './TwoFa.jsx';
import NotFound from './NotFound.jsx';
import Tournament from './Tournament/Tournament.jsx';
import OptionsPage from './Tournament/OptionsPage.jsx';
import TournamentRegistration from './Tournament/TournamentRegistration.jsx';
import PongGame from './Tournament/PongGame.jsx';
import AppGame from './Game/AppGame.jsx';
import { GameSocketProvider } from "./Game/components/GameSocketContext.jsx";
import  FriendDataProvider  from "./DashBoard/FriendDataContext.jsx";

function App() {
  return (
    <>
      <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      >
        <UserDataProvider>
        <SocketContextProvider>
        <GameSocketProvider>
        <FriendDataProvider>   
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<><Navbar /><HomePage /></>} />
            <Route path="/signin" element={<><Navbar /><SignIn /></>} />
            <Route path="/signup" element={<><Navbar /><SignUp /></>} />
            <Route path="/2fa/:username" element={<><Navbar /><TwoFa /></>} />
            <Route path="/about" element={<><Navbar /><AboutSection /></>} />
            <Route path="/howtoplay" element={<><Navbar /><HowToPlay /></>} />

            <Route path="/dashboard" element={
                  <ProtectedRoute component={NavbarSideBar} />
            }>
              <Route path="" element={
                  <ProtectedRoute component={Dashboard} />
              } />
              <Route path="profile/:username" element={
                  <ProtectedRoute component={Profile} />
              } />
              <Route path="settings" element={<ProtectedRoute component={ProfileSettings} />} />
            </Route>

            <Route path="/Chat" element={
                  <ProtectedRoute component={NavbarSideBar} />
            }>
              <Route path="" element={
                  <ProtectedRoute component={Chat} />
              } />
            </Route>

            <Route path="/tournament/options" element={
                <ProtectedRoute component={NavbarSideBar} />
            }>
              <Route path="" element={
                  <ProtectedRoute component={OptionsPage} />
              } />
              <Route path="play-tournament" element={
                  <ProtectedRoute component={Tournament} />
                } />
                <Route path="pong-tournament" element={
                  <ProtectedRoute component={PongGame} />
                } />
              <Route path="tournament-registration" element={
                  <ProtectedRoute component={TournamentRegistration} />
              } />
               <Route path='game/*' element={
                <ProtectedRoute component={AppGame} />
            }>
            <Route path='' element={
                <ProtectedRoute component={AppGame} />
            }/>
            </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          </FriendDataProvider>
          </GameSocketProvider>
        </SocketContextProvider>
        </UserDataProvider>
      </Router>
    </>
  );
};

export default App;
