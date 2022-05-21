import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'context'
import { Navbar, Footer, VideoCard } from 'components'
import { errorToast } from 'components/toast/toasts'
import PlaylistCard from './PlaylistCard'
export function Playlist() {
  const [playlists, setPlaylists] = useState([])
  const { encodedToken } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/playlists`, {
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
        <div className="videos-container">
          {playlists.map(playlist => (
            <PlaylistCard playlist={playlist} key={playlist._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
