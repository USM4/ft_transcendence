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
import Features from './Features.jsx';
import HowToPlay from './HowToPlay.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import UserDataProvider from './DashBoard/UserDataContext.jsx'
import FriendDataProvider from './DashBoard/FriendDataContext.jsx'
import SocketContextProvider from './DashBoard/SocketContext.jsx';
import { Toaster } from 'react-hot-toast';
import TwoFa from './TwoFa.jsx';
import NotFound from './NotFound.jsx';
import Tournament from './Tournament/Tournament.jsx';
import OptionsPage from './Tournament/OptionsPage.jsx';
import TournamentRegistration from './Tournament/TournamentRegistration.jsx';
import PongGame from './Tournament/TournametGame/PongGame.jsx';
import AppGame from './Game/AppGame.jsx';

function App() {
  return (
    <>
      <Router>
      <UserDataProvider>
        <SocketContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Navbar /><HomePage /></>} />
            <Route path="/signin" element={<><Navbar /><SignIn /></>} />
            <Route path="/signup" element={<><Navbar /><SignUp /></>} />
            <Route path="/2fa" element={<><Navbar /><TwoFa /></>} />
            <Route path="/features" element={<><Navbar /><Features /></>} />
            <Route path="/howtoplay" element={<><Navbar /><HowToPlay /></>} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <UserDataProvider>
                <FriendDataProvider>
                  <ProtectedRoute component={NavbarSideBar} />
                </FriendDataProvider>
              </UserDataProvider>
            }>
              <Route path="" element={
                <FriendDataProvider>
                  <ProtectedRoute component={Dashboard} />
                </FriendDataProvider>
              } />
              <Route path="profile/:username" element={
                <FriendDataProvider>
                  <ProtectedRoute component={Profile} />
                </FriendDataProvider>
              } />
              <Route path="settings" element={<ProtectedRoute component={ProfileSettings} />} />
            </Route>

            <Route path="/Chat" element={
              <UserDataProvider>
                <FriendDataProvider>
                  <ProtectedRoute component={NavbarSideBar} />
                </FriendDataProvider>
              </UserDataProvider>
            }>
              <Route path="" element={
                <FriendDataProvider>
                  <ProtectedRoute component={Chat} />
                </FriendDataProvider>
              } />
            </Route>

            <Route path="/tournament/options" element={
              <UserDataProvider>
                <ProtectedRoute component={NavbarSideBar} />
              </UserDataProvider>
            }>
              {/* Default OptionsPage for Tournament Options */}
              <Route path="" element={
                <FriendDataProvider>
                  <ProtectedRoute component={OptionsPage} />
                </FriendDataProvider>
              } />
              <Route path="play-tournament" element={
                <UserDataProvider>
                  <ProtectedRoute component={Tournament} />
                </UserDataProvider>
              } />
              <Route path="tournament-registration" element={
                <UserDataProvider>
                  <ProtectedRoute component={TournamentRegistration} />
                </UserDataProvider>
              } />
               <Route path='game/*' element={
              <UserDataProvider>
                <ProtectedRoute component={AppGame} />
              </UserDataProvider>
            }>
            <Route path='' element={
              <FriendDataProvider>
                <ProtectedRoute component={AppGame} />
              </FriendDataProvider>
            }/>
            </Route>
              {/* Play vs Bot */}
              {/* <Route path="play-vs-bot" element={
                <UserDataProvider>
                  <ProtectedRoute component={PlayVsBot} />
                </UserDataProvider>
              } /> */}
              
              {/* Play vs Friend */}
              {/* <Route path="play-vs-friend" element={
                <UserDataProvider>
                  <ProtectedRoute component={PlayVsFriend} />
                </UserDataProvider>
              } /> */}
              
              {/* Play Tournament */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SocketContextProvider>
        </UserDataProvider>
      </Router>
    </>
  );
}

export default App
