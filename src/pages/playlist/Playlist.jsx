import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'context'
import { Navbar, Footer, VideoCard } from 'components'
import { errorToast } from 'components/toast/toasts'

export function Playlist() {
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="videos-container"></div>
      </div>
      <Footer />
    </div>
  )
}
