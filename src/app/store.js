import { configureStore } from '@reduxjs/toolkit'
import likedVideosReducer from 'features/likedvideos/likedVideosSlice.js'
import watchLaterReducer from 'features/watchlater/watchLaterSlice.js'

export const store = configureStore({
    reducer: {
        likedVideos: likedVideosReducer,
        watchLater: watchLaterReducer,
    },
})