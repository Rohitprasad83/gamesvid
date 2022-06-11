import { Link } from 'react-router-dom'
import { successToast } from 'components/toast/toasts'
import { logout } from 'features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
export function Navbar() {
  const dispatch = useDispatch()
  const { encodedToken } = useSelector(state => state.auth)

  const logoutHandler = () => {
    dispatch(logout())
    successToast('You have successfully logged out')
  }
  return (
    <nav className="navbar simple">
      <h3 className="navbar__header"> GamesVid </h3>
      <ul className="navbar__list">
        <li className="navbar__list__items">
          {encodedToken ? (
            <Link to="/" onClick={() => logoutHandler()}>
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
