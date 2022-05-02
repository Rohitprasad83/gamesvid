import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'context'
import { Navbar, Footer, VideoCard } from 'components'
import { errorToast } from 'components/toast/toasts'
import { clearAllHistory } from 'services'
export function History() {
  const [historyVideo, setHistoryVideo] = useState([])
  const { encodedToken } = useAuth()
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/history`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setHistoryVideo(response.data.history)
      } catch (error) {
        errorToast('Could not get liked videos')
      }
    })()
  }, [historyVideo])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="text__center">
          <button
            className="btn btn__error__outlined"
            onClick={() => clearAllHistory()}>
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
