import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'

const encodedToken = localStorage.getItem('token')
const addToWatchLater = async video => {
    if (encodedToken) {
        try {
            const response = await axios.post(
                `/api/user/watchlater`, { video }, {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            )
            successToast(video.title + ' added to Watch LaterVideos')
        } catch (err) {
            if (err.response.status === 409)
                errorToast(video.title + ' is already present at Watch Later Videos')
            else errorToast('Something went wrong, Please try again!')
            console.log(err)
        }
    } else {
        errorToast('login first')
    }
}

const removeFromWatchLater = async videoId => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/watchlater/${videoId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('Video has been successfully removed from Watch Later')
        } catch (err) {
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

export { addToWatchLater, removeFromWatchLater }