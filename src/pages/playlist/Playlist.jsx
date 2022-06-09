import { useEffect } from 'react'
import { useAuth } from 'context'
import { Navbar, Footer } from 'components'
import PlaylistCard from './PlaylistCard'
import { getAllPlaylists } from 'features/playlist/playlistSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Ring } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'

export function Playlist() {
  const { encodedToken } = useAuth()
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlist.playlists)
  const { loading, error } = useSelector(state => state.playlist)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllPlaylists({ encodedToken }))
  }, [])

  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="videos-container">
          {loading && <Ring size={128} speed={1} />}
          {error && (
            <h2>
              Sorry, We could not fetch the videos, please refresh the page!
            </h2>
          )}
          {!loading &&
            playlists.map(playlist => (
              <PlaylistCard playlist={playlist} key={playlist._id} />
            ))}
          {!loading && playlists.length < 1 && (
            <div className="add-videos">
              <h4>You haven't created any playlist</h4>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
