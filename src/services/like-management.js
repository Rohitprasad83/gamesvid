import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'

const encodedToken = localStorage.getItem('token')
const likeVideo = async video => {
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
        } catch (err) {
            if (err.response.status === 409)
                errorToast(video.title + ' is already present at Liked Videos')
            else errorToast('Something went wrong, Please try again!')
            console.log(err)
        }
    } else {
        errorToast('login first')
    }
}

const deleteVideo = async(videoId, encodedToken) => {
    console.log(videoId)
    if (encodedToken) {
        try {
            const response = await axios.post(`/api/user/likes/${videoId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            console.log(response.data.likes)
        } catch (err) {
            console.log(err)
        }
    } else {
        console.log('login first')
    }
}

export { likeVideo, deleteVideo }