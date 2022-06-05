import React, { useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllVideos } from 'features/videos/videosSlice'
import {
  getCategory,
  getAllCategories,
  allVideos,
} from 'features/categories/categoriesSlice'
export function VideoListing() {
  const { videos, loading, error } = useSelector(state => state.videos)
  const { categories, category } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllVideos())
    dispatch(getAllCategories())
  }, [])

  return (
    <div>
      <div className="home__container">
        <Navbar />
        <div className="main__container">
          <div className="video-categories text__center text__lg">
            <span
              className={
                'category ' + (category === 'All' ? 'category-active' : '')
              }
              onClick={() => dispatch(allVideos())}>
              All
            </span>

            {categories.map(({ categoryName, _id }) => (
              <span
                className={
                  'category ' +
                  (categoryName === category.categoryName
                    ? 'category-active'
                    : '')
                }
                key={_id}
                onClick={() => dispatch(getCategory(_id))}>
                {categoryName}
              </span>
            ))}
          </div>
          <div className="videos-container">
            {loading && <h1>Loading...</h1>}
            {error && (
              <h2>
                Sorry, We could not fetch the videos, please refresh the page!
              </h2>
            )}
            {category !== 'All'
              ? videos
                  .filter(video => video.category === category.categoryName)
                  .map(video => <VideoCard key={video._id} video={video} />)
              : videos.map(video => (
                  <VideoCard key={video._id} video={video} />
                ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
