import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useUser } from '../context/UserContext'
import logoImg from '../assets/logo.png'
import './Navbar.css'

function Navbar() {
  const [soundOn, setSoundOn] = useState(false)
  const { user } = useUser()
  const playerName = user?.name || 'tên người chơi'

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">
          <img src={logoImg} alt="Green Footprint" className="logo-img" />
          <span className="logo-text">
            GREEN<br />FOOTPRINT
          </span>
        </a>

        <div className="navbar-right">
          <a href="#gioi-thieu" className="nav-link">GIỚI THIỆU</a>
          <a href="#huong-dan" className="nav-link">HƯỚNG DẪN</a>
          <span className="player-greeting">
            <em>Xin chào, "{playerName}"</em>
          </span>
          <button
            className="sound-toggle"
            onClick={() => setSoundOn(!soundOn)}
            aria-label={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
