import React from 'react'
import { Link } from 'react-router-dom'
export function Footer() {
  return (
    <div className="footer text__md">
      <Link to="/" className="footer-item">
        <span>
          <i className="fa-solid fa-house"></i>
        </span>
        <span>Home</span>
      </Link>
      <Link to="/videos" className="footer-item">
        <span>
          <i className="fa-solid fa-compass"></i>
        </span>
        <span>Explore</span>
      </Link>
      <div className="footer-item">
        <span>
          <i className="fa-solid fa-layer-group"></i>
        </span>
        <span>Playlist</span>
      </div>
      <Link to="/liked-videos" className="footer-item">
        <span>
          <i className="fa-solid fa-heart"></i>
        </span>
        <span>Liked Videos</span>
      </Link>
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
