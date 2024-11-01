import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import NavbarSideBar from './DashBoard/NavBarSideBar.jsx'
import Dashboard from './DashBoard/Dashboard.jsx';
import Profile from './Dashboard/Profile.jsx'
import ProfileSettings from'./Dashboard/ProfileSettings.jsx';
import HomePage from './HomePage.jsx';
import Features from './Features.jsx';
import HowToPlay from './HowToPlay.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import UserDataProvider from './Dashboard/UserDataContext.jsx'
import FriendDataProvider from './Dashboard/FriendDataContext.jsx'

function App() {
  return (
    <>
    {/* <UserDataProvider> */}
        <Router>
        <Routes>
          <Route path='/' element={<><Navbar/><HomePage/></>}/>
          <Route path='/signin' element={<><Navbar/><SignIn/></>}/>
          <Route path='/signup' element={<><Navbar/><SignUp/></>}/>
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
            </FriendDataProvider>} 
          />
          <Route path='profile' element={
            <FriendDataProvider>
              <ProtectedRoute component={Profile} />
            </FriendDataProvider>} />
            <Route path='settings' element={<ProtectedRoute component={ProfileSettings} />} />
          </Route>
        </Routes>
      </Router>
    {/* </UserDataProvider> */}
      
    </>
  )
}

export default App
