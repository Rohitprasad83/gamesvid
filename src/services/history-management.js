import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'
// import {
//     addVideoToHistory,
//     deleteVideoFromHistory,
//     deleteAllVideos,
// } from 'features/historyvideos/historyVideosSlice'

const encodedToken = localStorage.getItem('token')
const addToHistory = async(video, dispatch) => {
    if (encodedToken && video._id !== undefined) {
        try {
            const response = await axios.post(
                    `/api/user/history`, { video }, {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                )
                // dispatch(addVideoToHistory(video))
        } catch (err) {
            if (err.response.status !== 409)
                errorToast('Something went wrong, Please try again!')
        }
    } else {
        errorToast('login first')
    }
}

const removeFromHistory = async(videoId, dispatch) => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/history/${videoId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('Video has been successfully removed from History')
                // dispatch(deleteVideoFromHistory(videoId))
        } catch (err) {
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

const clearAllHistory = async dispatch => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/history/all`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('History has been cleared successfully!')
                // dispatch(deleteAllVideos())
        } catch (err) {
            console.log(err)
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

export { addToHistory, removeFromHistory, clearAllHistory }