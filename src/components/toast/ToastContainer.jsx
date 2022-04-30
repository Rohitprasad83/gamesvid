import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export function ToastContainerCustom() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      className="text__md"
    />
  )
}
