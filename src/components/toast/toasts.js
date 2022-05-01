import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const successToast = msg =>
    toast.success(msg, {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
const errorToast = msg =>
    toast.error(msg, {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })

export { successToast, errorToast }