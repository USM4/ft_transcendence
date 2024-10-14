import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Profile from './Dashboard/Profile.jsx'
import HomePage from './HomePage.jsx';
import Features from './Features.jsx';
import HowToPlay from './HowToPlay.jsx'

function App() {
  return (
    <>
        <Router>
        
        <Routes>
          <Route path='/' element={<><Navbar/><HomePage/></>}/>
          <Route path='/signin' element={<><Navbar/><SignIn/></>}/>
          <Route path='/signup' element={<><Navbar/><SignUp/></>}/>
          <Route path='/features' element={<><Navbar/><Features/></>}/>
          <Route path='/howtoplay' element={<><Navbar/><HowToPlay/></>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/profile' element={<Profile/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
