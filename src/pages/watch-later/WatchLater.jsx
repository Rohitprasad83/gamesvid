import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'context'
import { Navbar, Footer, VideoCard } from 'components'
import { errorToast } from 'components/toast/toasts'
import { useSelector } from 'react-redux'

export function WatchLater() {
  const [watchLaterVideos, setWatchLaterVideos] = useState([])
  const { encodedToken } = useAuth()

  const videos = useSelector(state => state.watchLater.videos)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/watchlater`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setWatchLaterVideos(videos)
      } catch (error) {
        errorToast('Could not get liked videos')
      }
    })()
  }, [videos])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="videos-container">
          {watchLaterVideos.map(video => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
