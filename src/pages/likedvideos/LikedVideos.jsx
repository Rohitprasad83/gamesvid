import { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLikedVideos } from 'features/likedvideos/likedVideosSlice'
export function LikedVideos() {
  const videos = useSelector(state => state.likedVideos.videos)
  const dispatch = useDispatch()
  const encodedToken = localStorage.getItem('token')

  useEffect(() => {
    dispatch(getAllLikedVideos({ encodedToken }))
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
