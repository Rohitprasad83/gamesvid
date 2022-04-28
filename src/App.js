import './App.css'
import Home from 'pages/home/Home'
import VideoListing from 'pages/videoListing/VideoListing'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoListing />} />
      </Routes>
    </div>
  )
}

export default App
