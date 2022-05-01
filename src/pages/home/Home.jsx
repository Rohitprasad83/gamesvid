import React from 'react'
import banner from 'assets/images/banner.jpg'
import { Navbar, Footer } from 'components'
export default function Home() {
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <img
          src={banner}
          alt="banner"
          className="responsive__img center__image"
        />
        <h5 className="text-left home-banner">Trending Videos</h5>
        <div className="videos-container"></div>
      </div>
      <Footer />
    </div>
  )
}
