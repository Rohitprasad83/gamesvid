import { configureStore } from '@reduxjs/toolkit'
import likedVideosReducer from 'features/likedvideos/likedVideosSlice.js'

export const store = configureStore({
    reducer: {
        likedVideos: likedVideosReducer,
    },
})