import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Chat from './Chat/Chat.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import NavbarSideBar from './DashBoard/NavBarSideBar.jsx';
import Dashboard from './DashBoard/Dashboard.jsx';
import Profile from './DashBoard/Profile.jsx';
import ProfileSettings from './DashBoard/ProfileSettings.jsx';
import HomePage from './HomePage.jsx';
import Features from './Features.jsx';
import HowToPlay from './HowToPlay.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import UserDataProvider from './DashBoard/UserDataContext.jsx';
import FriendDataProvider from './DashBoard/FriendDataContext.jsx';
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
              <SocketContextProvider>
                <FriendDataProvider>
                  <ProtectedRoute component={NavbarSideBar} />
                </FriendDataProvider>
              </SocketContextProvider>
            </UserDataProvider>
          }>
            <Route path="" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <FriendDataProvider>
                    <ProtectedRoute component={Dashboard} />
                  </FriendDataProvider>
                </SocketContextProvider>
              </UserDataProvider>
            } />
            <Route path="profile/:username" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <FriendDataProvider>
                    <ProtectedRoute component={Profile} />
                  </FriendDataProvider>
                </SocketContextProvider>
              </UserDataProvider>
            } />
            <Route path="settings" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <ProtectedRoute component={ProfileSettings} />
                </SocketContextProvider>
              </UserDataProvider>
            } />
          </Route>

          <Route path="/Chat" element={
            <UserDataProvider>
              <SocketContextProvider>
                <FriendDataProvider>
                  <ProtectedRoute component={NavbarSideBar} />
                </FriendDataProvider>
              </SocketContextProvider>
            </UserDataProvider>
          }>
            <Route path="" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <FriendDataProvider>
                    <ProtectedRoute component={Chat} />
                  </FriendDataProvider>
                </SocketContextProvider>
              </UserDataProvider>
            } />
          </Route>

          <Route path="/tournament/options" element={
            <UserDataProvider>
              <SocketContextProvider>
                <ProtectedRoute component={NavbarSideBar} />
              </SocketContextProvider>
            </UserDataProvider>
          }>
            {/* Tournament Options */}
            <Route path="" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <FriendDataProvider>
                    <ProtectedRoute component={OptionsPage} />
                  </FriendDataProvider>
                </SocketContextProvider>
              </UserDataProvider>
            } />
            <Route path="play-tournament" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <ProtectedRoute component={Tournament} />
                </SocketContextProvider>
              </UserDataProvider>
            } />
            <Route path="tournament-registration" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <ProtectedRoute component={TournamentRegistration} />
                </SocketContextProvider>
              </UserDataProvider>
            } />
            <Route path="game/*" element={
              <UserDataProvider>
                <SocketContextProvider>
                  <ProtectedRoute component={AppGame} />
                </SocketContextProvider>
              </UserDataProvider>
            }>
              <Route path="" element={
                <UserDataProvider>
                  <SocketContextProvider>
                    <FriendDataProvider>
                      <ProtectedRoute component={AppGame} />
                    </FriendDataProvider>
                  </SocketContextProvider>
                </UserDataProvider>
              } />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
