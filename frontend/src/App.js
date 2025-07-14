import React from 'react'
import Header from './Components/Header'
import { Routes,BrowserRouter, Route } from 'react-router-dom'
import Home from './Pages/Main/Home'
import About from './Pages/Main/About'
import Error from './Pages/Main/Error'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import Profile from './Pages/Main/Profile'
const App = () => {
  return (
    <>
<BrowserRouter>
<Header/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="*" element={<Error />} />
</Routes>

</BrowserRouter>

    </>
    
  )
}

export default App