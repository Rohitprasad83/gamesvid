import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    videos: [],
    loading: false,
    error: false,
    video: {},
}

export const getAllVideos = createAsyncThunk(
    'videos/getAllVideos',
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/videos')
            return response.data.videos
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getVideo = createAsyncThunk(
    'videos/getVideo',
    async(videoId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/video/${videoId}`)
            return response.data.video
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllVideos.pending]: state => {
            state.loading = true
            state.error = false
        },
        [getAllVideos.fulfilled]: (state, { payload }) => {
            state.videos = payload
            state.loading = false
            state.error = false
        },
        [getAllVideos.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
        },
        [getVideo.pending]: state => {
            state.loading = true
            state.error = false
            state.video = {}
        },
        [getVideo.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.video = payload
        },
        [getVideo.rejected]: (state, { payload }) => {
            state.error = true
            state.loading = false
            state.video = {}
        },
    },
})

export default videosSlice.reducer