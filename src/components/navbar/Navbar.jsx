import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar simple">
      <h3 className="navbar__header"> GamesVid </h3>
      <ul className="navbar__list">
        <li className="navbar__list__items">
          <span className="badge__icons">
            <button className="btn btn__secondary navbar-btn">Login</button>
          </span>
        </li>
      </ul>
    </nav>
  )
}
