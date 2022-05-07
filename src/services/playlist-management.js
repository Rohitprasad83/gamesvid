import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'

const encodedToken = localStorage.getItem('token')
const addPlaylist = async(title, description) => {
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
        } catch (err) {
            if (err.response.status === 409)
                errorToast(title + ' already exists in playlist')
            else errorToast('Something went wrong, Please try again!')
            console.log(err)
        }
    } else {
        errorToast('login first')
    }
}

const deletePlaylist = async playlistId => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/playlists/${playlistId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('Playlist has been removed')
        } catch (err) {
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

const addVideoToPlaylist = async(playlistId, video) => {
    if (encodedToken) {
        try {
            const response = await axios.post(
                `/api/user/playlists/${playlistId}`, { video }, {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            )
        } catch (err) {
            if (err.response.status === 409)
                errorToast(video.title + ' already exists in playlist')
            else errorToast('Something went wrong, Please try again!')
            console.log(err)
        }
    } else {
        errorToast('login first')
    }
}
const deletePlaylistVideo = async(playlistId, videoId) => {
    if (encodedToken) {
        try {
            const response = await axios.delete(
                `/api/user/playlists/${playlistId}/${videoId}`, {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            )
            successToast('Video has been deleted from playlist')
        } catch (err) {
            console.log(err)
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

export { addPlaylist, deletePlaylist, deletePlaylistVideo, addVideoToPlaylist }