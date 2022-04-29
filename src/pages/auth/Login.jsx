import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authStyle from './auth.module.css'
import axios from 'axios'
// import { useAuth } from 'context/auth-context'
// import { successToast, errorToast } from 'components/toast/toasts'
// import { useTitle } from 'utils/useTitle'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigate()
  const [error, setError] = useState(null)
  // const { setUsers, encodedToken } = useAuth()
  const [showPassword, setShowPassword] = useState('password')

  //   useTitle('| Login')

  //   useEffect(() => {
  //     if (encodedToken) {
  //       navigation('/home')
  //       successToast('Welcome Back to Notes Banao')
  //     }
  //   })
  const loginHandler = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      })
      localStorage.setItem('token', response.data.encodedToken)
      // setUsers(response.data.foundUser)
      response.status === 200 && navigation('/home')
    } catch (err) {
      setError("Could'nt Login Up, Please try Again!")
      //   errorToast(error)
    }
  }
  const fillDummyDetails = () => {
    setEmail('adarshbalika@gmail.com')
    setPassword('adarshBalika123')
  }

  const allFieldsAreFilled = email !== '' && password !== ''
  const showPasswordHandler = () => {
    return setShowPassword(showPassword === 'password' ? 'text' : 'password')
  }
  return (
    <div>
      <form
        onClick={loginHandler}
        className={`form__group ${authStyle['form__group']}`}>
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
        <label htmlFor="password">Password</label>
        <input
          type={showPassword}
          id="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          className={`form__group__input ${authStyle['input']}`}
          onChange={e => setPassword(e.target.value)}
        />

        <div className={`form__bottom ${authStyle['form__bottom']}`}>
          <label className="text__md" onClick={showPasswordHandler}>
            <input
              type="checkbox"
              checked={showPassword === 'text' ? 'checked' : false}
            />
            Show Password
          </label>
          <span className="forgot__password text__bold text__md">
            Forgot your password?
          </span>
        </div>
        <button
          className={`"btn btn__warning ${authStyle['login']}`}
          type="submit"
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
          <Link to="/signup"> Create a new account </Link>
        </div>
      </form>
    </div>
  )
}
