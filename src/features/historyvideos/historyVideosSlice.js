import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'

const initialState = {
    videos: [],
}

export const getAllHistoryVideos = createAsyncThunk(
    'history/getAllHistoryVideos',
    async({ encodedToken }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/user/history`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            return response.data.history
        } catch (error) {
            return rejectWithValue('Could not get history videos')
        }
    }
)

export const addToHistory = createAsyncThunk(
    'history/addToHistory',
    async({ video, encodedToken }, { rejectWithValue }) => {
        if (video._id !== undefined) {
            try {
                const response = await axios.post(
                    `/api/user/history`, { video }, {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                )
                return response.data.history
            } catch (err) {
                if (err.response.status !== 409)
                    rejectWithValue('Something went wrong, Please try again!')
            }
        }
    }
)

export const removeFromHistory = createAsyncThunk(
    'history/removeFromHistory',
    async({ _id, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(`/api/user/history/${_id}`, {
                    headers: {
                        authorization: encodedToken,
                    },
                })
                return response.data.history
            } catch (err) {
                rejectWithValue('Something went wrong, please try again later!')
            }
        } else {
            errorToast('Please login first!')
        }
    }
)

export const clearAllHistory = createAsyncThunk(
    'history/clearAllhistory',
    async({ encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(`/api/user/history/all`, {
                    headers: {
                        authorization: encodedToken,
                    },
                })
                successToast('History has been cleared successfully!')
                return response.data.history
            } catch (err) {
                return rejectWithValue('Something went wrong, please try again later!')
            }
        } else {
            errorToast('Please login first!')
        }
    }
)

export const historyVideosSlice = createSlice({
    name: 'historyVideos',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllHistoryVideos.pending]: state => {
            state.loading = true
            state.error = false
        },
        [getAllHistoryVideos.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [getAllHistoryVideos.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
            errorToast(payload)
        },
        [addToHistory.pending]: state => {
            state.loading = true
            state.error = false
        },
        [addToHistory.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [addToHistory.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
        },
        [removeFromHistory.pending]: state => {
            state.loading = true
            state.error = false
        },
        [removeFromHistory.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
            successToast('video has been successfully deleted from history')
        },
        [removeFromHistory.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
            errorToast(payload)
        },
        [clearAllHistory.pending]: state => {
            state.loading = true
            state.error = false
        },
        [clearAllHistory.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [clearAllHistory.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
            errorToast(payload)
        },
    },
})

export default historyVideosSlice.reducer