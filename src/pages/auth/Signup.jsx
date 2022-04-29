import { useReducer, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import authStyle from './auth.module.css'
// import { useAuth } from 'context/auth-context'
import { validateEmail, validatePass } from 'utils/authenticationUtils'
// import { authReducer } from 'reducer/authReducer'
// import { successToast, errorToast } from 'components/toast/toasts'
// import { useTitle } from 'utils/useTitle'

export function Signup() {
  //   const [userState, userDispatch] = useReducer(authReducer, {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   })
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState('password')
  const navigation = useNavigate()
  //   const { email, firstName, lastName, password, confirmPassword } = userState
  //   const { setUsers, encodedToken } = useAuth()

  //   useTitle('| SignUp')
  //   useEffect(() => {
  //     if (encodedToken) {
  //       navigation('/home')
  //       successToast('Welcome Back to Notes Banao')
  //     }
  //   })
  //   const SignUpHandler = async e => {
  //     e.preventDefault()
  //     try {
  //       const response = await axios.post('/api/auth/signup', {
  //         email,
  //         firstName,
  //         lastName,
  //         password,
  //       })
  //       successToast('You have signed up successfully')
  //       localStorage.setItem('token', response.data.encodedToken)
  //       setUsers(response.data.createdUser)
  //       response.status === 201 && navigation('/home')
  //     } catch (err) {
  //       setError("Could'nt Sign Up, Please try Again!")
  //       errorToast(error)
  //     }
  //   }

  const showPasswordHandler = () => {
    return setShowPassword(showPassword === 'password' ? 'text' : 'password')
  }

  //   const allFieldsAreFilled =
  //     firstName !== '' &&
  //     lastName !== '' &&
  //     email !== '' &&
  //     password !== '' &&
  //     confirmPassword !== '' &&
  //     password === confirmPassword &&
  //     validatePass(password) &&
  //     validateEmail(email)

  return (
    <div>
      <form
        // onSubmit={SignUpHandler}
        className={`form__group ${authStyle['form__group']}`}>
        <h4 className={authStyle['heading']}>Sign up</h4>
        <div className="form__name">
          <label htmlFor="first__name">
            First Name
            <input
              type="text"
              id="first__name"
              name="first__name"
              //   value={firstName}
              className={`form__group__input ${authStyle['input']}`}
              //   onChange={e =>
              //     userDispatch({ type: 'FIRST_NAME', payload: e.target.value })
              //   }
              required
            />
          </label>
          <label htmlFor="last__name">
            Last Name
            <input
              type="text"
              id="last__name"
              name="last__name"
              //   value={lastName}
              className={`form__group__input ${authStyle['input']}`}
              //   onChange={e =>
              //     userDispatch({ type: 'LAST_NAME', payload: e.target.value })
              //   }
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
            // value={email}
            className={`form__group__input ${authStyle['input']}`}
            // onChange={e =>
            //   userDispatch({ type: 'EMAIL', payload: e.target.value })
            // }
            required
          />
        </label>
        {/* {email === '' ? (
          true
        ) : validateEmail(email) ? (
          true
        ) : (
          <div className="msg login__error">
            <i className="fas fa-exclamation-triangle"></i> Enter correct Email
          </div>
        )} */}
        <label htmlFor="pass">
          Password
          <input
            type={showPassword}
            id="pass"
            name="pass"
            className={`form__group__input ${authStyle['input']}`}
            // value={password}
            // onChange={e =>
            //   userDispatch({ type: 'PASSWORD', payload: e.target.value })
            // }
            required
          />
        </label>

        {/* {password === '' ? (
          true
        ) : validatePass(password) ? (
          true
        ) : (
          <div className="msg login__error">
            <i className="fas fa-exclamation-triangle"></i> Password must have
            Minimum eight characters and a number
          </div>
        )} */}

        <label htmlFor="confirm__password">
          Confirm Password
          <input
            type={showPassword}
            id="confirm__password"
            name="confirm__password"
            // value={confirmPassword}
            className={`form__group__input ${authStyle['input']}`}
            // onChange={e =>
            //   userDispatch({
            //     type: 'CONFIRM_PASSWORD',
            //     payload: e.target.value,
            //   })
            // }
            required
          />
        </label>
        {/* {password === confirmPassword ? (
          true
        ) : (
          <div className="msg login__error">
            <i className="fas fa-exclamation-triangle"></i> Password and Confirm
            Password is not same
          </div>
        )} */}
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
          className={`"btn btn__warning ${authStyle['login']}`}
          type="submit"
          //   disabled={!allFieldsAreFilled}>
        >
          Create a new Account
        </button>
        <button
          type="submit"
          //   onClick={() => userDispatch({ type: 'FILL_DUMMY_DETAILS' })}
          className={`"btn btn__info ${authStyle['login']}`}>
          SignUp with Dummy Details
        </button>
        <div className="register text__center">
          <Link to="/login"> Already have an account </Link>
        </div>
      </form>
    </div>
  )
}
