import React from 'react'
import videoCard from 'assets/images/videoCard.jpg'
import avatarVideo from 'assets/images/avatarVideo.png'
export default function VideoCard() {
  return (
    <div className="video-card text__md">
      <img src={videoCard} alt="Video Card" />
      <div className="video-heading">
        <div class="avatar avatar__sm">
          <img src={avatarVideo} alt="avatar for Video" />
        </div>
        <span className="video-title">Title for the Video</span>
      </div>
      <div>Channel</div>
      <div className="video-footer">
        <span>Views</span>
        <span>Age of the video</span>
      </div>
    </div>
  )
}
