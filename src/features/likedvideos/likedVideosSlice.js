import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videos: [],
}

export const likedVideosSlice = createSlice({
    name: 'likedVideos',
    initialState,
    reducers: {
        likeAVideo: (state, action) => {
            state.videos.push(action.payload)
        },
        deleteAVideo: (state, action) => {
            state.videos = state.videos.filter(video => video._id !== action.payload)
        },
    },
})

export const { likeAVideo, deleteAVideo } = likedVideosSlice.actions

export default likedVideosSlice.reducer