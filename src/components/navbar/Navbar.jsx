import { useAuth } from 'context'
import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  const { setEncodedToken } = useAuth

  const encodedToken = localStorage.getItem('token')
  const logout = () => {
    localStorage.removeItem('token')
    setEncodedToken(null)
  }
  return (
    <nav className="navbar simple">
      <h3 className="navbar__header"> GamesVid </h3>
      <ul className="navbar__list">
        <li className="navbar__list__items">
          {encodedToken !== null ? (
            <Link to="/" onClick={logout}>
              <button className="btn btn__secondary navbar-btn">Logout</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn btn__secondary navbar-btn">Login</button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
