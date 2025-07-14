import React from 'react'
import Header from './Components/Header'
import { Routes,BrowserRouter, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Main/Home'
import Note from './Pages/Main/Note'
import Bookmark from './Pages/Main/Bookmark'
import Error from './Pages/Main/Error'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import Profile from './Pages/Main/Profile'
import { useAuth } from './Context/auth'
import {  toast,ToastContainer} from "react-toastify";

const App = () => {
  const {auth} = useAuth();
  return (
    <>
<BrowserRouter>
<Header/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login/>} />
  <Route path="/home" element={<Home />} />
  <Route path="/note" element={auth ? <Note/> : <Navigate to="/login" />} />
          <Route path="/bookmark" element={auth ? <Bookmark/> : <Navigate to="/login" />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="*" element={<Error />} />
</Routes>
<ToastContainer/>
</BrowserRouter>

    </>
    
  )
}

export default App