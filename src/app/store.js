import { configureStore } from '@reduxjs/toolkit'
import likedVideosReducer from 'features/likedvideos/likedVideosSlice.js'
import watchLaterReducer from 'features/watchlater/watchLaterSlice.js'
import historyVideosReducer from 'features/historyvideos/historyVideosSlice.js'
import playlistReducer from 'features/playlist/playlistSlice'

export const store = configureStore({
    reducer: {
        likedVideos: likedVideosReducer,
        watchLater: watchLaterReducer,
        historyVideos: historyVideosReducer,
        playlist: playlistReducer,
    },
})