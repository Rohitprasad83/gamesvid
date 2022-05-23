import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    playlists: [],
}

export const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        addAPlaylist: (state, action) => {
            state.playlists.push(action.payload)
        },
        deleteAPlaylist: (state, action) => {
            state.playlists = state.playlists.filter(p => p._id !== action.payload)
        },
        addAVideoToPlaylist: (state, action) => {
            state.playlists
                .find(p => p._id === action.payload.playlistId)
                .videos.push(action.payload.video)
        },
        deleteAVideoFromPlaylist: (state, action) => {
            let videos = state.playlists.find(
                playlist => playlist._id === action.payload.playlistId
            ).videos
            videos = videos.filter(v => v._id !== action.payload.videoId)

            state.playlists.find(
                playlist => playlist._id === action.payload.playlistId
            ).videos = videos
        },
    },
})

export const {
    addAPlaylist,
    deleteAPlaylist,
    addAVideoToPlaylist,
    deleteAVideoFromPlaylist,
} = playlistSlice.actions

export default playlistSlice.reducer