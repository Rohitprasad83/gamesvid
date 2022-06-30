import { useReducer, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import authStyle from './auth.module.css'
import { validateEmail, validatePass } from 'utils/authenticationUtils'
import { authReducer } from 'reducer/authReducer'
import { Navbar, Footer } from 'components'
import { useTitle } from 'utils/useTitle'
import { signUpHandler } from 'features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export function Signup() {
  const [userState, userDispatch] = useReducer(authReducer, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState('password')
  const navigation = useNavigate()
  const { email, firstName, lastName, password, confirmPassword } = userState
  const { encodedToken } = useSelector(state => state.auth)

  const location = useLocation()
  const dispatch = useDispatch()

  useTitle('| SignUp')

  useEffect(() => {
    if (encodedToken) {
      navigation(location.state?.from?.pathname ?? '/', { replace: true })
    }
  }, [location, encodedToken, navigation])

  const showPasswordHandler = () => {
    return setShowPassword(showPassword === 'password' ? 'text' : 'password')
  }

  const allFieldsAreFilled =
    firstName !== '' &&
    lastName !== '' &&
    email !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    password === confirmPassword &&
    validatePass(password) &&
    validateEmail(email)

  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <form
          onSubmit={e =>
            dispatch(signUpHandler({ e, firstName, lastName, email, password }))
          }
          className={`form__group ${authStyle['form__group']}`}>
          <h4 className={authStyle['heading']}>Sign up</h4>
          <div className="form__name">
            <label htmlFor="first__name">
              First Name
              <input
                type="text"
                id="first__name"
                name="first__name"
                value={firstName}
                className={`form__group__input ${authStyle['input']}`}
                onChange={e =>
                  userDispatch({ type: 'FIRST_NAME', payload: e.target.value })
                }
                required
              />
            </label>
            <label htmlFor="last__name">
              Last Name
              <input
                type="text"
                id="last__name"
                name="last__name"
                value={lastName}
                className={`form__group__input ${authStyle['input']}`}
                onChange={e =>
                  userDispatch({ type: 'LAST_NAME', payload: e.target.value })
                }
                required
              />
            </label>
          </div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              className={`form__group__input ${authStyle['input']}`}
              onChange={e =>
                userDispatch({ type: 'EMAIL', payload: e.target.value })
              }
              required
            />
          </label>
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
          <label htmlFor="pass">
            Password
            <input
              type={showPassword}
              id="pass"
              name="pass"
              className={`form__group__input ${authStyle['input']}`}
              value={password}
              onChange={e =>
                userDispatch({ type: 'PASSWORD', payload: e.target.value })
              }
              required
            />
          </label>

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

          <label htmlFor="confirm__password">
            Confirm Password
            <input
              type={showPassword}
              id="confirm__password"
              name="confirm__password"
              value={confirmPassword}
              className={`form__group__input ${authStyle['input']}`}
              onChange={e =>
                userDispatch({
                  type: 'CONFIRM_PASSWORD',
                  payload: e.target.value,
                })
              }
              required
            />
          </label>
          {password === confirmPassword ? (
            true
          ) : (
            <div className="msg login__error">
              <i className="fas fa-exclamation-triangle"></i> Password and
              Confirm Password is not same
            </div>
          )}
          <label>
            <input
              type="checkbox"
              className="show__password text__md"
              onChange={showPasswordHandler}
            />
            Show Password
          </label>
          <div className="form__bottom">
            <label className="text__md">
              <input type="checkbox" />I accept all terms & conditions
            </label>
          </div>
          <button
            className={`"btn btn__error ${authStyle['login']}`}
            type="submit"
            disabled={!allFieldsAreFilled}>
            Create a new Account
          </button>
          <button
            type="submit"
            onClick={() => userDispatch({ type: 'FILL_DUMMY_DETAILS' })}
            className={`"btn btn__info ${authStyle['login']}`}>
            SignUp with Dummy Details
          </button>
          <div className="register text__center">
            <Link to="/login" className="text-underline">
              Already have an account
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
