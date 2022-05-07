import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'

const encodedToken = localStorage.getItem('token')
const addToHistory = async video => {
    if (encodedToken && video._id !== undefined) {
        try {
            const response = await axios.post(
                `/api/user/history`, { video }, {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            )
        } catch (err) {
            if (err.response.status === 409)
                errorToast(video.title + ' is already present at History Videos')
            else errorToast('Something went wrong, Please try again!')
            console.log(err)
        }
    } else {
        errorToast('login first')
    }
}

const removeFromHistory = async videoId => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/history/${videoId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('Video has been successfully removed from History')
        } catch (err) {
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

const clearAllHistory = async() => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/history/all`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('History has been cleared successfully!')
        } catch (err) {
            console.log(err)
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

export { addToHistory, removeFromHistory, clearAllHistory }