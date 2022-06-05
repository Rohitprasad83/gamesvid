import { useEffect } from 'react'
import { useAuth } from 'context'
import { Navbar, Footer } from 'components'
import PlaylistCard from './PlaylistCard'
import { getAllPlaylists } from 'features/playlist/playlistSlice'
import { useDispatch, useSelector } from 'react-redux'

export function Playlist() {
  const { encodedToken } = useAuth()
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlist.playlists)

  useEffect(() => {
    dispatch(getAllPlaylists({ encodedToken }))
  }, [])

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
