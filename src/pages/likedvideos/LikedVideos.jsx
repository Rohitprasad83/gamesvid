import { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLikedVideos } from 'features/likedvideos/likedVideosSlice'
import { Ring } from '@uiball/loaders'

export function LikedVideos() {
  const { videos, loading, error } = useSelector(state => state.likedVideos)
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
          {loading && <Ring size={128} speed={1} />}
          {error && (
            <h2>
              Sorry, We could not fetch the videos, please refresh the page!
            </h2>
          )}
          {!loading &&
            videos.map(video => <VideoCard video={video} key={video._id} />)}
        </div>
      </div>
      <Footer />
    </div>
  )
}
