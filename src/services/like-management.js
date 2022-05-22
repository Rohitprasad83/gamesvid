import axios from 'axios'
import { successToast, errorToast } from 'components/toast/toasts'
import { likeAVideo, deleteAVideo } from 'features/likedvideos/likedVideosSlice'

const encodedToken = localStorage.getItem('token')
const likeVideo = async(video, dispatch) => {
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
            dispatch(likeAVideo(video))
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

const deleteVideo = async(videoId, dispatch) => {
    if (encodedToken) {
        try {
            const response = await axios.delete(`/api/user/likes/${videoId}`, {
                headers: {
                    authorization: encodedToken,
                },
            })
            successToast('Video has been successfully removed from Liked Videos')
            dispatch(deleteAVideo(videoId))
        } catch (err) {
            errorToast('Something went wrong, please try again later!')
        }
    } else {
        errorToast('Please login first!')
    }
}

export { likeVideo, deleteVideo }