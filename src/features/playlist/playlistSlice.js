import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'

const initialState = {
    playlists: [],
    loading: false,
    error: false,
    currentPlaylist: {},
}

export const getAllPlaylists = createAsyncThunk(
    'playlist/getAllPlaylist',
    async({ encodedToken }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/user/playlists`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            return response.data.playlists
        } catch (error) {
            rejectWithValue('Something went wrong, please try again later!')
        }
    }
)

export const addPlaylist = createAsyncThunk(
    'playlist/addPlaylist',
    async({ playlistTitle, playlistDescription, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.post(
                    `/api/user/playlists`, {
                        playlist: {
                            title: playlistTitle,
                            description: playlistDescription,
                        },
                    }, {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                )
                successToast(playlistTitle + ' playlist has been created!')
                return response.data.playlists
            } catch (err) {
                if (err.status === 409)
                    return rejectWithValue(playlistTitle + ' already exists in playlist')
                else return rejectWithValue('Something went wrong, Please try again!')
            }
        } else {
            errorToast('login first')
        }
    }
)

export const deletePlaylist = createAsyncThunk(
    'playlist/deletePlaylist',
    async({ _id, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(`/api/user/playlists/${_id}`, {
                    headers: {
                        authorization: encodedToken,
                    },
                })
                successToast('Playlist has been removed')
                return response.data.playlists
            } catch (err) {
                return rejectWithValue('Something went wrong, please try again later!')
            }
        } else {
            errorToast('Please login first!')
        }
    }
)

export const addVideoToPlaylist = createAsyncThunk(
    'playlist/addVideoToPlaylist',
    async({ playlist, video, encodedToken }, { rejectWithValue, dispatch }) => {
        const _id = video._id
        const playlistId = playlist._id

        const playlistTitle = playlist.title
        if (encodedToken) {
            try {
                const { data } = await axios.post(
                    `/api/user/playlists/${playlistId}`, { video }, {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                )
                successToast(video.title + ' added to the ' + playlistTitle)
                return { data, playlistId }
            } catch (err) {
                if (err.response.status === 409) {
                    dispatch(deletePlaylistVideo({ playlistId, _id, encodedToken }))
                    return rejectWithValue()
                } else {
                    return rejectWithValue('Something went wrong, Please try again!')
                }
            }
        } else {
            errorToast('login first')
        }
    }
)
export const deletePlaylistVideo = createAsyncThunk(
    'playlist/deletePlaylistVideo',
    async({ playlistId, _id, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(
                    `/api/user/playlists/${playlistId}/${_id}`, {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                )

                successToast('Video has been deleted from the playlist')
                return response.data.playlist
            } catch (err) {
                return rejectWithValue('Something went wrong, please try again later!')
            }
        } else {
            errorToast('Please login first!')
        }
    }
)

export const getAllPlaylistVideos = createAsyncThunk(
    'playlist/getAllPlaylistVideos',
    async({ playlistId, encodedToken }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/user/playlists/${playlistId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            return response.data.playlist
        } catch (error) {
            return rejectWithValue(
                'Could not get all playlist videos, please try again!'
            )
        }
    }
)

export const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllPlaylists.pending]: state => {
            state.loading = true
        },
        [getAllPlaylists.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.playlists = payload
        },
        [getAllPlaylists.rejected]: (state, { payload }) => {
            state.error = true
            errorToast(payload)
        },
        [addPlaylist.pending]: state => {
            state.loading = true
        },
        [addPlaylist.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.playlists = payload
        },
        [addPlaylist.rejected]: (state, { payload }) => {
            state.error = true
            errorToast(payload)
        },
        [deletePlaylist.pending]: state => {
            state.loading = true
        },
        [deletePlaylist.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.playlists = payload
        },
        [deletePlaylist.rejected]: (state, { payload }) => {
            state.error = true
            errorToast(payload)
        },
        [addVideoToPlaylist.pending]: state => {
            state.loading = true
        },
        [addVideoToPlaylist.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.playlists[
                state.playlists.findIndex(
                    playlist => playlist._id === payload.playlistId
                )
            ].videos.push(payload.data.playlist)
        },
        [addVideoToPlaylist.rejected]: (state, { payload }) => {
            state.error = true
            errorToast(payload)
        },
        [deletePlaylistVideo.pending]: state => {
            state.loading = true
        },
        [deletePlaylistVideo.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.playlists[
                state.playlists.findIndex(playlist => playlist._id === payload._id)
            ] = payload
        },
        [deletePlaylistVideo.rejected]: (state, { payload }) => {
            state.error = true
            errorToast(payload)
        },
        [getAllPlaylistVideos.pending]: state => {
            state.loading = true
        },
        [getAllPlaylistVideos.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.currentPlaylist = payload
        },
        [getAllPlaylistVideos.rejected]: (state, { payload }) => {
            state.error = true
            errorToast(payload)
        },
    },
})

export const { containsInPlaylist } = playlistSlice.actions

export default playlistSlice.reducer