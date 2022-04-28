import React from 'react'
import videoCard from 'assets/images/videoCard.jpg'
import avatarVideo from 'assets/images/avatarVideo.png'
export default function VideoCard({ video }) {
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
  return (
    <div className="video-card text__md">
      <img src={thumbnail} alt={alt} className="video-thumbnail" />
      <div className="video-heading">
        <div className="video-avatar">
          <img src={avatar} alt="avatar for Video" className="video-avatar" />
        </div>
        <span className="video-title font__bold">{title}</span>
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
