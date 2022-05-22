import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'context'
import { Navbar, Footer, VideoCard } from 'components'
import { errorToast } from 'components/toast/toasts'
import { clearAllHistory } from 'services'
import { useDispatch, useSelector } from 'react-redux'

export function History() {
  const [historyVideo, setHistoryVideo] = useState([])
  const { encodedToken } = useAuth()
  const dispatch = useDispatch()
  const videos = useSelector(state => state.historyVideos.videos)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/history`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setHistoryVideo(videos)
      } catch (error) {
        errorToast('Could not get liked videos')
      }
    })()
  }, [videos])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="text__center">
          <button
            className="btn btn__error__outlined"
            onClick={() => clearAllHistory(dispatch)}>
            Clear All History
          </button>
        </div>
        <div className="videos-container">
          {historyVideo.map(video => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
