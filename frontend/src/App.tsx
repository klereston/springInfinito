//import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home'
import Entry from './pages/entry/Entry'
import { Navigate, Route, Routes } from"react-router-dom"
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Chat from './components/Chat'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const { authUser }:any = useAuthContext()

  return (
    <>
      <div className='appView'>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/home"  /> : <Entry />} />
          <Route path="/home" element={authUser ? <Home /> : <Navigate to="/"  /> } />
          <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/"  /> } />
          <Route path="/login" element={authUser ? <Navigate to="/home"  /> : <Login />} />
          <Route path="/signup" element={ authUser ? <Navigate to="/home"  /> : <Signup />} />
      </Routes>
      <Toaster />
      </div>
    </>
  )
}

export default App

