import React from 'react'

export default function Footer() {
  return (
    <div className="footer text__md">
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-house"></i>
        </span>
        <span>Home</span>
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-compass"></i>
        </span>
        <span>Explore</span>
      </div>
      <div className="footer-item">
        <span>
          <i class="fa-solid fa-layer-group"></i>
        </span>
        <span>Playlist</span>
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-heart"></i>
        </span>
        <span>Liked Videos</span>
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-clock"></i>
        </span>
        <span>Watch Later</span>
      </div>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-clock-rotate-left"></i>
        </span>
        <span>History</span>
      </div>
    </div>
  )
}
