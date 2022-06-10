import { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllWatchLaterVideos } from 'features/watchlater/watchLaterSlice'
import { useTitle } from 'utils/useTitle'

export function WatchLater() {
  const dispatch = useDispatch()
  const { videos } = useSelector(state => state.watchLater)
  const encodedToken = localStorage.getItem('token')
  const navigate = useNavigate()

  useTitle(' | watch later')

  useEffect(() => {
    dispatch(getAllWatchLaterVideos({ encodedToken }))
  }, [])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="videos-container">
          {videos.length > 0 ? (
            videos.map(video => <VideoCard video={video} key={video._id} />)
          ) : (
            <div className="add-videos">
              <h4>You haven't added any videos to watch later</h4>
              <button
                className="btn btn__secondary navbar-btn"
                onClick={() => navigate('/videos')}>
                Add Videos
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
