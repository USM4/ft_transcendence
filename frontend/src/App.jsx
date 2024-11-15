import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import Chat from './Chat/Chat.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import NavbarSideBar from './DashBoard/NavBarSideBar.jsx'
import Dashboard from './DashBoard/Dashboard.jsx';
import Profile from './Dashboard/Profile.jsx'
import ProfileSettings from'./DashBoard/ProfileSettings.jsx';
import HomePage from './HomePage.jsx';
import Features from './Features.jsx';
import HowToPlay from './HowToPlay.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import UserDataProvider from './DashBoard/UserDataContext.jsx'
import FriendDataProvider from './Dashboard/FriendDataContext.jsx'
import SocketContextProvider from './DashBoard/SocketContext.jsx';
import { Toaster } from 'react-hot-toast';
import TwoFa from './TwoFa.jsx';
function App() {
  return (
    <>
    {/* <UserDataProvider> */}
        <Router>
          <SocketContextProvider >
          <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path='/' element={<><Navbar/><HomePage/></>}/>
          <Route path='/signin' element={<><Navbar/><SignIn/></>}/>
          <Route path='/signup' element={<><Navbar/><SignUp/></>}/>
          <Route path='/2fa' element={<><Navbar/><TwoFa/></>}/>
          <Route path='/features' element={<><Navbar/><Features/></>}/>
          <Route path='/howtoplay' element={<><Navbar/><HowToPlay/></>}/>
            <Route path='/dashboard' element={
              <UserDataProvider>
                <ProtectedRoute component={NavbarSideBar} />
              </UserDataProvider>
            }>
            <Route path='' element={
              <FriendDataProvider>
                <ProtectedRoute component={Dashboard} />
              </FriendDataProvider>
            } 
            />
            <Route path='profile/:username' element={
              <FriendDataProvider>
                <ProtectedRoute component={Profile} />
              </FriendDataProvider>} />
              <Route path='settings' element={<ProtectedRoute component={ProfileSettings} />} />
            </Route>
            <Route path='/chat' element={
              <UserDataProvider>
                <ProtectedRoute component={NavbarSideBar} />
              </UserDataProvider>
            }>
            <Route path='' element={
              <FriendDataProvider>
                <ProtectedRoute component={Chat} />
              </FriendDataProvider>
            }/>
            </Route>
        </Routes>
          </SocketContextProvider>
      </Router>
    {/* </UserDataProvider> */}
      
    </>
  )
}

export default App
