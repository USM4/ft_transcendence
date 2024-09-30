import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Dashboard from './Dashboard.jsx'
import HomePage from './HomePage.jsx';

function App() {
  return (
    <>
        <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
