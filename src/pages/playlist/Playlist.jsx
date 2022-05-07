import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'context'
import { Navbar, Footer, VideoCard } from 'components'
import { errorToast } from 'components/toast/toasts'

export function Playlist() {
  const [playlists, setPlaylists] = useState([])
  const { encodedToken } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/playlistss`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setPlaylists(response.data.playlists)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [playlists])
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
