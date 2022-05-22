import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videos: [],
}

export const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        addVideoToWatchLater: (state, action) => {
            state.videos.push(action.payload)
        },
        deleteVideoFromWatchLater: (state, action) => {
            state.videos = state.videos.filter(video => video._id !== action.payload)
        },
    },
})

export const { addVideoToWatchLater, deleteVideoFromWatchLater } =
watchLaterSlice.actions

export default watchLaterSlice.reducer