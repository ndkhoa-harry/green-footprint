import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Mascot from '../components/Mascot'
import bgImage from '../assets/home_background.png'
import trophyImg from '../assets/trophy.png'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar showGreeting={false} />

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">GREEN</span>
              <span className="title-line">FOOTPRINT</span>
            </h1>
            <p className="hero-subtitle">&quot;GÓP XANH THÊM XINH&quot;</p>
            <p className="hero-description">
              Hành trình du lịch xanh - Thu gom rác thải - Bảo vệ môi trường
            </p>
          </div>

          <div className="hero-mascot">
            <Mascot />
          </div>
        </div>

        <div className="bottom-bar">
          <div className="bottom-bar-inner">
            <div className="stages-info">
              <img src={trophyImg} alt="Trophy" className="trophy-img" />
              <div className="stages-text">
                <h2>HOÀN THÀNH 3 CHẶNG - NHẬN HUY HIỆU XANH</h2>
                <p>Bạn đã sẵn sàng trở thành &quot;Nhà du hành xanh&quot; ?</p>
              </div>
            </div>

            <div className="divider" />

            <button
              type="button"
              className="home-start-btn"
              onClick={() => navigate('/introduction')}
            >
              Bắt đầu chơi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
