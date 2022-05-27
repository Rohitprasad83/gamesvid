import React, { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllVideos } from 'features/videos/videosSlice'
export function VideoListing() {
  const { videos, loading, error } = useSelector(state => state.videos)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllVideos())
  }, [])

  return (
    <div>
      <div className="home__container">
        <Navbar />
        <div className="main__container">
          <div className="video-categories text__center text__lg">
            <span className="category category-active">All</span>
            <span className="category">Action</span>
            <span className="category">Arcade</span>
            <span className="category">Adventure</span>
            <span className="category">Sports</span>
            <span className="category">Strategy</span>
          </div>
          <div className="videos-container">
            {loading && <h1>Loading...</h1>}
            {error && (
              <h2>
                Sorry, We could not fetch the videos, please refresh the page!
              </h2>
            )}
            {videos &&
              videos.map(video => <VideoCard key={video._id} video={video} />)}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
