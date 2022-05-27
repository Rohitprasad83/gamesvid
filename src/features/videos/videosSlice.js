import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    videos: [],
    loading: false,
    error: false,
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
    },
})

export const { likeAVideo, deleteAVideo } = videosSlice.actions

export default videosSlice.reducer