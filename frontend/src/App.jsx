import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={''}/>
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
