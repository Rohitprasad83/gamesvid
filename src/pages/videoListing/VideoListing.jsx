import React, { useState, useEffect } from 'react'
import Navbar from 'components/navbar/Navbar'
import Footer from 'components/footer/Footer'
import VideoCard from 'components/videocard/VideoCard'

export default function VideoListing() {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/videos')
      const data = await response.json()
      setVideos(data.videos)
    })()
  })
  return (
    <div>
      <div className="home__container">
        <Navbar />
        <div className="main__container">
          <div className="video-categories text__center text__lg">
            <span className="category category-active">All</span>
            <span className="category">Action</span>
            <span className="category">Arcade</span>
            <span className="category">Adventure</span>
            <span className="category">Sports</span>
            <span className="category">Strategy</span>
          </div>
          <div className="videos-container">
            {videos &&
              videos.map(video => <VideoCard key={video._id} video={video} />)}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
