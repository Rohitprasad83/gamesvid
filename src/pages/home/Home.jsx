import React from 'react'
import banner from 'assets/images/banner.jpg'
import Navbar from 'components/navbar/Navbar'
import VideoCard from 'components/videocard/VideoCard'
export default function Home() {
  return (
    <div className="main__container">
      <Navbar />
      <img
        src={banner}
        alt="banner"
        className="responsive__img center__image"
      />
      <h5 className="text-left home-banner">Trending Videos</h5>
      <div className="videos-container">
        <VideoCard />
        <VideoCard />
        <VideoCard />

        <VideoCard />
      </div>
    </div>
  )
}
