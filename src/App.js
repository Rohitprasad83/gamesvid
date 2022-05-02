import './App.css'
import {
  Home,
  VideoListing,
  Login,
  Signup,
  SingleVideo,
  LikedVideos,
  WatchLater,
} from 'pages'
import { ToastContainerCustom } from 'components/toast/ToastContainer'
import { Routes, Route } from 'react-router-dom'
import Mockman from 'mockman-js'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoListing />} />
        <Route path="/videos/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="/watch-later" element={<WatchLater />} />

        <Route path="/mock" element={<Mockman />} />
      </Routes>
      <ToastContainerCustom />
    </div>
  )
}

export default App
