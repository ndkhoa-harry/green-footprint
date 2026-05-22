import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Volume2, VolumeX } from 'lucide-react'
import { useUser } from '../context/UserContext'
import logoImg from '../assets/logo.png'
import './Navbar.css'

function Navbar({ showGreeting = true }) {
  const [soundOn, setSoundOn] = useState(false)
  const { user } = useUser()
  const playerName = user?.name?.trim()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src={logoImg} alt="Green Footprint" className="logo-img" />
          <span className="logo-text">
            GREEN<br />FOOTPRINT
          </span>
        </Link>

        <div className="navbar-right">
          <Link to="/introduction" state={{ fromNav: true }} className="nav-link">
            GIỚI THIỆU
          </Link>
          <Link to="/instructions" state={{ fromNav: true }} className="nav-link">
            HƯỚNG DẪN
          </Link>
          {showGreeting && playerName && (
            <span className="player-greeting">
              <em>Xin chào, &quot;{playerName}&quot;</em>
            </span>
          )}
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
