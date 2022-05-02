import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'context'
import { Navbar, Footer, VideoCard } from 'components'
import { errorToast } from 'components/toast/toasts'
export function LikedVideos() {
  const [likedVideos, setLikedVideos] = useState([])
  const { encodedToken } = useAuth()
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/likes`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setLikedVideos(response.data.likes)
      } catch (error) {
        errorToast('Could not get liked videos')
      }
    })()
  }, [likedVideos])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="videos-container">
          {likedVideos.map(video => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
