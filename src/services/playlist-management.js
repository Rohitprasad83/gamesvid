import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'
import {
    addAPlaylist,
    deleteAPlaylist,
    addAVideoToPlaylist,
    deleteAVideoFromPlaylist,
} from 'features/playlist/playlistSlice'

const encodedToken = localStorage.getItem('token')
const addPlaylist = async(title, description, dispatch) => {
    if (encodedToken) {
        try {
            const response = await axios.post(
                `/api/user/playlists`, { playlist: { title, description } }, {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            )
            successToast(title + ' playlist has been created!')
            dispatch(
                addAPlaylist(
                    response.data.playlists[Number(response.data.playlists.length - 1)]
                )
            )
        } catch (err) {
            if (err.status === 409) errorToast(title + ' already exists in playlist')
            else errorToast('Something went wrong, Please try again!')
            console.log(err)
        }
    } else {
        errorToast('login first')
    }
}

const deletePlaylist = async(playlistId, dispatch) => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/playlists/${playlistId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('Playlist has been removed')
            dispatch(deleteAPlaylist(playlistId))
        } catch (err) {
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

const addVideoToPlaylist = async(
    playlistId,
    video,
    playlistTitle,
    dispatch
) => {
    if (encodedToken) {
        try {
            const response = await axios.post(
                `/api/user/playlists/${playlistId}`, { video }, {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            )
            successToast(video.title + ' added to the ' + playlistTitle)
            dispatch(
                addAVideoToPlaylist({
                    playlistId,
                    video: response.data.playlist.videos[
                        Number(response.data.playlist.videos.length - 1)
                    ],
                })
            )
        } catch (err) {
            if (err.response.status === 409) {
                deletePlaylistVideo(playlistId, video._id, playlistTitle)
            } else {
                errorToast('Something went wrong, Please try again!')
                console.log(err)
            }
        }
    } else {
        errorToast('login first')
    }
}
const deletePlaylistVideo = async(
    playlistId,
    videoId,
    playlistTitle,
    dispatch
) => {
    if (encodedToken) {
        try {
            const response = await axios.delete(
                `/api/user/playlists/${playlistId}/${videoId}`, {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            )
            dispatch(deleteAVideoFromPlaylist({ playlistId, videoId }))
            successToast('Video has been deleted from the playlist')
        } catch (err) {
            console.log(err)
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

export { addPlaylist, deletePlaylist, deletePlaylistVideo, addVideoToPlaylist }