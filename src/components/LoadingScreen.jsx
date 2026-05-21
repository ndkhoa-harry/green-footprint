import loadingLogo from '../assets/loading_logo.png'
import './LoadingScreen.css'

function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label="Đang tải">
      <img
        src={loadingLogo}
        alt=""
        className="loading-screen-logo"
        draggable={false}
      />
    </div>
  )
}

export default LoadingScreen
