import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authStyle from './auth.module.css'
import axios from 'axios'
import { useAuth } from 'context/auth-context'
import { Navbar, Footer } from 'components'
import { successToast, errorToast } from 'components/toast/toasts'
import { useTitle } from 'utils/useTitle'
import { validateEmail, validatePass } from 'utils/authenticationUtils'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigate()
  const [error, setError] = useState(null)
  const { setUsers, encodedToken } = useAuth()
  const [showPassword, setShowPassword] = useState('password')

  useTitle('| Login')

  useEffect(() => {
    if (encodedToken) {
      navigation('/')
      successToast('Welcome Back to GamesVid')
    }
  })
  const loginHandler = async e => {
    e.preventDefault()
    if (email && password) {
      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        })
        localStorage.setItem('token', response.data.encodedToken)
        setUsers(response.data.foundUser)
        response.status === 200 && navigation('/')
      } catch (err) {
        setError("Could'nt Login Up, Please try Again!")
        errorToast(error)
      }
    }
  }
  const fillDummyDetails = e => {
    e.preventDefault()
    setEmail('adarshbalika@gmail.com')
    setPassword('adarshBalika123')
  }

  const allFieldsAreFilled = email !== '' && password !== ''
  const showPasswordHandler = () => {
    return setShowPassword(showPassword === 'password' ? 'text' : 'password')
  }
  return (
    <div className="home__container">
      <div className="main__container">
        <Navbar />
        <form className={`form__group ${authStyle['form__group']}`}>
          <h4 className={authStyle['heading']}>Login</h4>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            className={`form__group__input ${authStyle['input']}`}
            onChange={e => setEmail(e.target.value)}
          />
          {email === '' ? (
            true
          ) : validateEmail(email) ? (
            true
          ) : (
            <div className="msg login__error">
              <i className="fas fa-exclamation-triangle"></i> Enter correct
              Email
            </div>
          )}
          <label htmlFor="password">Password</label>
          <div className={authStyle['form__password']}>
            <input
              type={showPassword}
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              className={`form__group__input no-border ${authStyle['input']}`}
              onChange={e => setPassword(e.target.value)}
            />
            <span>
              {showPassword === 'text' ? (
                <i
                  className="fa-solid fa-eye pointer"
                  onClick={showPasswordHandler}></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash pointer"
                  onClick={showPasswordHandler}></i>
              )}
            </span>
          </div>
          {password === '' ? (
            true
          ) : validatePass(password) ? (
            true
          ) : (
            <div className="msg login__error">
              <i className="fas fa-exclamation-triangle"></i> Password must have
              Minimum eight characters and a number
            </div>
          )}
          <div className={`form__bottom ${authStyle['form__bottom']}`}>
            <span className="forgot__password text__bold text__md">
              Forgot your password?
            </span>
          </div>
          <button
            className={`"btn btn__error ${authStyle['login']}`}
            onClick={loginHandler}
            disabled={!allFieldsAreFilled}>
            <i className="fas fa-sign-in-alt login__icon"></i>
            Login
          </button>
          <button
            className={`"btn btn__info ${authStyle['login']}`}
            onClick={fillDummyDetails}>
            <i className="fas fa-sign-in-alt login__icon"></i>
            Fill Dummy details
          </button>
          <div className="register text__center">
            <Link to="/signup" className="text-underline">
              Create a new account
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
