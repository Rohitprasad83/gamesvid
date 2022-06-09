import { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAllHistory,
  getAllHistoryVideos,
} from 'features/historyvideos/historyVideosSlice'
import { Ring } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'

export function History() {
  const encodedToken = localStorage.getItem('token')
  const dispatch = useDispatch()
  const historyVideos = useSelector(state => state.historyVideos.videos)
  const { loading, error } = useSelector(state => state.historyVideos)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllHistoryVideos({ encodedToken }))
  }, [])

  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="text__center">
          <button
            className="btn btn__error__outlined"
            onClick={() => dispatch(clearAllHistory({ encodedToken }))}>
            Clear All History
          </button>
        </div>
        <div className="videos-container">
          {loading && <Ring size={128} speed={1} />}
          {error && (
            <h2>
              Sorry, We could not fetch the videos, please refresh the page!
            </h2>
          )}
          {!loading &&
            historyVideos.map(video => (
              <VideoCard video={video} key={video._id} />
            ))}

          {!loading && historyVideos.length < 1 && (
            <div className="add-videos">
              <h4>You haven't watched any videos</h4>
              <button
                className="btn btn__secondary navbar-btn"
                onClick={() => navigate('/videos')}>
                Watch Videos
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
