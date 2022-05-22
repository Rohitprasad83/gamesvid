import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videos: [],
}

export const historyVideosSlice = createSlice({
    name: 'historyVideos',
    initialState,
    reducers: {
        addVideoToHistory: (state, action) => {
            state.videos.push(action.payload)
        },
        deleteVideoFromHistory: (state, action) => {
            state.videos = state.videos.filter(video => video._id !== action.payload)
        },
        deleteAllVideos: state => {
            state.videos = []
        },
    },
})

export const { addVideoToHistory, deleteVideoFromHistory, deleteAllVideos } =
historyVideosSlice.actions

export default historyVideosSlice.reducer