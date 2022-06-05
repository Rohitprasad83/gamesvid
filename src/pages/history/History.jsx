import { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAllHistory,
  getAllHistoryVideos,
} from 'features/historyvideos/historyVideosSlice'

export function History() {
  const encodedToken = localStorage.getItem('token')
  const dispatch = useDispatch()
  const historyVideos = useSelector(state => state.historyVideos.videos)
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
          {historyVideos.map(video => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
