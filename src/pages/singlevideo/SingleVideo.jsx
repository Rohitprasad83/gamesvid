import { useState, useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { videos } from 'backend/db/videos'
import { likeVideo, addToWatchLater } from 'services'
import { useAuth } from 'context'
export function SingleVideo() {
  let { videoId } = useParams()
  const [video, setVideo] = useState({})

  const {
    _id,
    title,
    description,
    views,
    creator,
    duration,
    thumbnail,
    alt,
    category,
    avatar,
    link,
  } = video
  const { encodedToken } = useAuth()

  useEffect(() => {
    const video = videos.find(product => product._id === videoId)
    setVideo(video)
  }, [videoId])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container single-video-container">
        <div className="single-video text__lg">
          <div className="video-player">
            <iframe
              className="video-iframe"
              src={link}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
          <div className="single-video-footer">
            <div className="text__xl font__bold">{title}</div>
            <div className="single-video-details">
              <div className="single-video-icons">
                <span className="pointer" onClick={() => likeVideo(video)}>
                  <i className="fa-regular fa-thumbs-up"></i> Like
                </span>
                <span className="pointer">
                  <i className="fa-regular fa-thumbs-down"></i>Dislike
                </span>
                <span
                  className="pointer"
                  onClick={() => addToWatchLater(video)}>
                  <i className="fa-regular fa-heart"></i>Add to Watch Later
                </span>
                <span className="pointer">
                  <i className="fa-solid fa-layer-group"></i>Add to Playist
                </span>
              </div>
              <div className="video-side-details">
                <span>{views} views</span>
                <span>
                  {duration} <i className="fa-solid fa-stopwatch"></i>
                </span>
              </div>
            </div>
            <div className="creator-details">
              <div className="video-avatar">
                <img
                  src={avatar}
                  alt="avatar for Video"
                  className="video-avatar"
                />
              </div>
              <div>{creator}</div>
            </div>
            <div className="font__bold">Description</div>
            <div className="text__md">{description}</div>
          </div>
        </div>
        <div className="side-videos">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
