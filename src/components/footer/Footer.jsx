import React from 'react'

export default function Footer() {
  return (
    <div className="footer text__md">
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-house"></i>
        </span>
        Home
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-compass"></i>
        </span>
        Explore
      </div>
      <div className="footer-item">
        <span>
          <i class="fa-solid fa-layer-group"></i>
        </span>
        Playlist
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-heart"></i>
        </span>
        Liked Videos
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-clock"></i>
        </span>
        Watch Later
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-clock-rotate-left"></i>
        </span>
        History
      </div>
    </div>
  )
}
