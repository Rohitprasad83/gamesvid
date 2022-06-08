import { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllWatchLaterVideos } from 'features/watchlater/watchLaterSlice'

export function WatchLater() {
  const dispatch = useDispatch()
  const { videos } = useSelector(state => state.watchLater)
  const encodedToken = localStorage.getItem('token')
  useEffect(() => {
    dispatch(getAllWatchLaterVideos({ encodedToken }))
  }, [])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="videos-container">
          {videos.map(video => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
