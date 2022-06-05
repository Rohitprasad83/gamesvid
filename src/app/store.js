import { configureStore } from '@reduxjs/toolkit'
import likedVideosReducer from 'features/likedvideos/likedVideosSlice.js'
import watchLaterReducer from 'features/watchlater/watchLaterSlice.js'
import historyVideosReducer from 'features/historyvideos/historyVideosSlice.js'
import playlistReducer from 'features/playlist/playlistSlice'
import videosReducer from 'features/videos/videosSlice'
import categoriesReducer from 'features/categories/categoriesSlice'
import authReducer from 'features/auth/authSlice'

export const store = configureStore({
    reducer: {
        likedVideos: likedVideosReducer,
        watchLater: watchLaterReducer,
        historyVideos: historyVideosReducer,
        playlist: playlistReducer,
        videos: videosReducer,
        categories: categoriesReducer,
        auth: authReducer,
    },
})