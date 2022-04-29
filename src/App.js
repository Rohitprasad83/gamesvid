import './App.css'
import Home from 'pages/home/Home'
import VideoListing from 'pages/videoListing/VideoListing'
import { Login } from 'pages/auth/Login'
import { Signup } from 'pages/auth/Signup'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
