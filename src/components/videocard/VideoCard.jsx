import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { deleteVideo, removeFromWatchLater } from 'services'
export function VideoCard({ video }) {
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

  let location = useLocation()
  return (
    <div className="video-card text__md">
      {location.pathname === '/liked-videos' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => deleteVideo(_id)}></i>
        </span>
      )}

      {location.pathname === '/watch-later' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => removeFromWatchLater(_id)}></i>
        </span>
      )}
      <Link to={`/videos/${_id}`}>
        <img src={thumbnail} alt={alt} className="video-thumbnail" />
      </Link>
      <div className="video-heading">
        <div className="video-avatar">
          <img src={avatar} alt="avatar for Video" className="video-avatar" />
        </div>
        <Link to={`/videos/${_id}`} className="video-title font__bold">
          {title}
        </Link>
      </div>
      <div className="video-channel font__regular text__md">{creator}</div>
      <div className="video-footer">
        <span>{views} views</span>
        <span>
          {' '}
          <i className="fa-solid fa-stopwatch"></i>
          {duration}
        </span>
        <span>
          <i className="fa-solid fa-bars video-option"></i>
        </span>
      </div>
    </div>
  )
}
