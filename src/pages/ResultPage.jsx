import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RotateCcw, Home } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { useGame } from '../context/GameContext'
import Navbar from '../components/Navbar'
import resultBg from '../assets/result_background.png'
import resultRibbon from '../assets/result_ribbon.png'
import badgeImg from '../assets/badge.png'
import mascotImg from '../assets/mascot_4.png'
import './ResultPage.css'

function ResultPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { isPhaseCompleted } = useGame()
  const playerName = user?.name?.trim() || 'Bạn'
  const studentId = user?.studentId?.trim() || '—'
  const displayName = playerName.toUpperCase()
  const ribbonMessage = 'ĐÃ HOÀN THÀNH 3/3 CHẶNG'
  const ribbonNameFontSize =
    displayName.length > 18 ? 18 : displayName.length > 14 ? 22 : displayName.length > 10 ? 26 : 30
  const ribbonMessageFontSize = ribbonMessage.length > 24 ? 18 : 22

  useEffect(() => {
    if (!isPhaseCompleted(3)) {
      navigate('/map', { replace: true })
    }
  }, [isPhaseCompleted, navigate])

  const handlePlayAgain = () => {
    navigate('/map')
  }

  const handleHome = () => {
    navigate('/home')
  }

  if (!isPhaseCompleted(3)) {
    return null
  }

  return (
    <div className="result-page">
      <div className="result-capture">
        <Navbar />

        <div
          className="result-scene"
          style={{ backgroundImage: `url(${resultBg})` }}
        >
          <div className="result-title-wrap">
            <svg
              className="result-title-svg"
              viewBox="0 0 640 112"
              overflow="visible"
              aria-hidden
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path id="result-title-arc" d="M 72 84 Q 320 8 568 84" fill="none" />
                <filter id="result-title-shadow" x="-15%" y="-50%" width="130%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
                </filter>
              </defs>
              <text className="result-title-svg-text" filter="url(#result-title-shadow)">
                <textPath href="#result-title-arc" startOffset="50%" textAnchor="middle">
                  CHÚC MỪNG
                </textPath>
              </text>
            </svg>
            <h1 className="result-title-sr">CHÚC MỪNG</h1>
          </div>

          <div className="result-ribbon-wrap">
            <img src={resultRibbon} alt="" className="result-ribbon-img" draggable={false} />
            <svg
              className="result-ribbon-svg"
              viewBox="0 0 520 92"
              aria-hidden
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path
                  id="result-ribbon-arc-name"
                  d="M 52 34 Q 260 10 468 34"
                  fill="none"
                />
                <path
                  id="result-ribbon-arc-message"
                  d="M 36 58 Q 260 38 484 58"
                  fill="none"
                />
                <filter id="result-ribbon-text-shadow" x="-10%" y="-50%" width="120%" height="200%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="rgba(0,0,0,0.4)" />
                </filter>
              </defs>
              <text
                className="result-ribbon-svg-text result-ribbon-svg-text--name"
                filter="url(#result-ribbon-text-shadow)"
                style={{ fontSize: ribbonNameFontSize }}
              >
                <textPath href="#result-ribbon-arc-name" startOffset="50%" textAnchor="middle">
                  {displayName}
                </textPath>
              </text>
              <text
                className="result-ribbon-svg-text result-ribbon-svg-text--message"
                filter="url(#result-ribbon-text-shadow)"
                style={{ fontSize: ribbonMessageFontSize }}
              >
                <textPath href="#result-ribbon-arc-message" startOffset="50%" textAnchor="middle">
                  {ribbonMessage}
                </textPath>
              </text>
            </svg>
          </div>

          <img src={mascotImg} alt="Milo" className="result-mascot" draggable={false} />

          <article className="result-certificate" aria-label="Giấy chứng nhận">
            <h2 className="result-cert-title">GIẤY CHỨNG NHẬN</h2>
            <div className="result-cert-body">
              <p className="result-cert-line">
                <span className="result-cert-label">Bạn:</span>{' '}
                <strong>{playerName.toUpperCase()}</strong>
              </p>
              <p className="result-cert-line">
                <span className="result-cert-label">MSSV:</span>{' '}
                <strong>{studentId}</strong>
              </p>
              <p className="result-cert-desc">
                <span className="result-cert-check" aria-hidden>
                  ✓
                </span>
                Bạn đã hoàn thành thành công cả 3 chặng và trở thành{' '}
                <strong>NHÀ DU HÀNH XANH</strong> — những người bạn đồng hành
                cùng hành trình bảo vệ môi trường trong chuyến đi này.
              </p>
            </div>
            <img src={badgeImg} alt="" className="result-cert-seal" draggable={false} />
          </article>


          <div className="result-center-col">
            <img src={badgeImg} alt="" className="result-badge" draggable={false} />
            <div className="result-bottom">
              <div className="result-message">
              <p>Gửi tặng bạn một &quot;HUY HIỆU XANH&quot;</p>
              <p>Vì đã cùng tụi mình hoàn thành một chuyến đi thật ý nghĩa</p>
            </div>
            <div className="result-actions">
              <button type="button" className="result-btn" onClick={handlePlayAgain}>
                <RotateCcw size={22} strokeWidth={2.5} aria-hidden />
                Chơi lại
              </button>
              <button type="button" className="result-btn" onClick={handleHome}>
                <Home size={22} strokeWidth={2.5} aria-hidden />
                Về trang chủ
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
