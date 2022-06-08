import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { successToast, errorToast } from 'components/toast/toasts'
import axios from 'axios'

const initialState = {
    videos: [],
    loading: false,
    error: false,
}

export const getAllWatchLaterVideos = createAsyncThunk(
    'watchLater/getAllWatchLaterVideos',
    async({ encodedToken }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/user/watchlater`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            return response.data.watchlater
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addToWatchLater = createAsyncThunk(
    'watchLater/addToWatchLater',
    async({ video, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.post(
                    `/api/user/watchlater`, { video }, {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                )
                successToast(video.title + ' added to Watch LaterVideos')
                return response.data.watchlater
            } catch (error) {
                if (error.response.status === 409) {
                    return rejectWithValue(
                        video.title + ' is already present at Watch Later Videos'
                    )
                } else {
                    return rejectWithValue('Something went wrong, Please try again!')
                }
            }
        } else {
            errorToast('login first')
        }
    }
)

export const removeFromWatchLater = createAsyncThunk(
    'watchLater/removeFromWatchLater',
    async({ _id, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(`/api/user/watchlater/${_id}`, {
                    headers: {
                        authorization: encodedToken,
                    },
                })
                successToast('Video has been successfully removed from Watch Later')
                return response.data.watchlater
            } catch (error) {
                return rejectWithValue('Something went wrong, please try again later!')
            }
        } else {
            errorToast('Please login first!')
        }
    }
)
export const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {},
    extraReducers: {
        [addToWatchLater.pending]: state => {
            state.loading = true
            state.error = false
        },
        [addToWatchLater.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [addToWatchLater.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            errorToast(payload)
        },
        [removeFromWatchLater.pending]: state => {
            state.loading = true
            state.error = false
        },
        [removeFromWatchLater.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [removeFromWatchLater.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            errorToast(payload)
        },
        [getAllWatchLaterVideos.pending]: state => {
            state.loading = true
            state.error = false
        },
        [getAllWatchLaterVideos.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [getAllWatchLaterVideos.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = true
            state.error = payload
        },
    },
})

export default watchLaterSlice.reducer