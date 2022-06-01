import React, { useState, useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllVideos, searchVideo } from 'features/videos/videosSlice'
import {
  getCategory,
  getAllCategories,
  allVideos,
} from 'features/categories/categoriesSlice'

export function VideoListing() {
  const { videos, loading, error } = useSelector(state => state.videos)
  const { categories, category } = useSelector(state => state.categories)
  // const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllVideos())
    dispatch(getAllCategories())
  }, [])

  function debounce(func, timeout = 1000) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, timeout)
    }
  }

  const filterByTitle = debounce(search => {
    dispatch(searchVideo(search))
  }, 1000)

  return (
    <div>
      <div className="home__container">
        <Navbar />
        <div className="main__container">
          <div className="video-categories text__center text__lg">
            <div>
              <input type="text" onKeyUp={e => filterByTitle(e.target.value)} />
            </div>
            <div
              className={
                'category ' + (category === 'All' ? 'category-active' : '')
              }
              onClick={() => dispatch(allVideos())}>
              All
            </div>

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
