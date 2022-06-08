import React from 'react'
import './App.css'
import {
  Home,
  VideoListing,
  Login,
  Signup,
  SingleVideo,
  LikedVideos,
  WatchLater,
  History,
  Playlist,
  SinglePlaylist,
  NotFound,
} from 'pages'
import { ToastContainerCustom } from 'components/toast/ToastContainer'
import { Routes, Route } from 'react-router-dom'
import Mockman from 'mockman-js'
import { PrivateRoute } from 'components'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoListing />} />
        <Route path="/videos/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/history" element={<History />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/mock" element={<Mockman />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainerCustom />
    </div>
  )
}

export default App
