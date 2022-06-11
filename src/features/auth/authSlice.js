import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'

const initialState = {
    user: localStorage.getItem('user'),
    encodedToken: localStorage.getItem('token'),
    loading: false,
    error: false,
}

export const loginHandler = createAsyncThunk(
    'auth/loginHandler',
    async({ e, email, password }, { rejectWithValue }) => {
        e.preventDefault()
        if (email && password) {
            try {
                const response = await axios.post('/api/auth/login', {
                    email,
                    password,
                })
                return response.data
            } catch (error) {
                return rejectWithValue(error)
            }
        }
    }
)

export const signUpHandler = createAsyncThunk(
    'auth/signUpHandler',
    async({ e, email, firstName, lastName, password }, { rejectWithValue }) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/auth/signup', {
                email,
                firstName,
                lastName,
                password,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.encodedToken = null
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
    },
    extraReducers: {
        [loginHandler.pending]: state => {
            state.loading = true
            state.error = false
        },
        [loginHandler.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.user = payload.foundUser
            state.encodedToken = payload.encodedToken
            localStorage.setItem('token', payload.encodedToken)
            localStorage.setItem('user', JSON.stringify(payload.foundUser))
            successToast('Welcome Back to GamesVid')
        },
        [loginHandler.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
            errorToast("Could'nt Login In, Please try Again!")
        },
        [signUpHandler.pending]: state => {
            state.loading = true
            state.error = false
        },
        [signUpHandler.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.user = payload.createdUser
            state.encodedToken = payload.encodedToken
            localStorage.setItem('token', payload.encodedToken)
            localStorage.setItem('user', JSON.stringify(payload.foundUser))
            successToast('You have signed up successfully')
        },
        [signUpHandler.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
            errorToast('Could not Sign up, please try again')
        },
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer