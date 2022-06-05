import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { successToast, errorToast } from 'components/toast/toasts'
import axios from 'axios'

const initialState = {
    videos: [],
    loading: false,
    error: false,
}

export const getAllLikedVideos = createAsyncThunk(
    'likes/getAllLikedVideos',
    async({ encodedToken }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/user/likes`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            return response.data.likes
        } catch (error) {
            return rejectWithValue('Could not get liked videos')
        }
    }
)

export const likeVideo = createAsyncThunk(
    'likes/likeVideo',
    async({ video, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.post(
                    `/api/user/likes`, { video }, {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                )
                successToast(video.title + ' added to Liked Videos')
                return response.data.likes
            } catch (error) {
                if (error.response.status === 409) {
                    errorToast(video.title + ' is already present at Liked Videos')
                    return rejectWithValue('video already present')
                } else return rejectWithValue('Something went wrong, Please try again!')
            }
        } else {
            errorToast('login first')
        }
    }
)
export const deleteVideo = createAsyncThunk(
    'likes/deleteVideo',
    async({ _id, encodedToken }, { rejectWithValue }) => {
        if (encodedToken) {
            try {
                const response = await axios.delete(`/api/user/likes/${_id}`, {
                    headers: {
                        authorization: encodedToken,
                    },
                })
                successToast('Video has been successfully removed from Liked Videos')
                return response.data.likes
            } catch (error) {
                rejectWithValue('Something went wrong, please try again later!')
            }
        } else {
            errorToast('Please login first!')
        }
    }
)
export const likedVideosSlice = createSlice({
    name: 'likedVideos',
    initialState,
    reducers: {},
    extraReducers: {
        [likeVideo.pending]: state => {
            state.loading = true
            state.error = false
        },
        [likeVideo.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [likeVideo.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [deleteVideo.pending]: state => {
            state.loading = true
            state.error = false
        },
        [deleteVideo.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [deleteVideo.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [getAllLikedVideos.pending]: state => {
            state.loading = true
            state.error = false
        },
        [getAllLikedVideos.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = false
            state.videos = payload
        },
        [getAllLikedVideos.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export const { likeAVideo, deleteAVideo } = likedVideosSlice.actions

export default likedVideosSlice.reducer