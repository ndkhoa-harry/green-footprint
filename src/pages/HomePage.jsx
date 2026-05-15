import Navbar from '../components/Navbar'
import Mascot from '../components/Mascot'
import bgImage from '../assets/home_background.png'
import trophyImg from '../assets/trophy.png'
import lb1 from '../assets/leaderboard_1.png'
import lb2 from '../assets/leaderboard_2.png'
import lb3 from '../assets/leaderboard_3.png'
import './HomePage.css'

const leaderboard = [
  { rank: 1, name: 'Tí quậy', avatar: lb1 },
  { rank: 2, name: 'Tiểu muội', avatar: lb2 },
  { rank: 3, name: 'Cô vk bé bỏng', avatar: lb3 },
]

function HomePage() {
  return (
    <div className="home-page">
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">GREEN</span>
              <span className="title-line">FOOTPRINT</span>
            </h1>
            <p className="hero-subtitle">"GÓP XANH THÊM XINH"</p>
            <p className="hero-description">
              Hành trình du lịch xanh - Thu gom rác thải - Bảo vệ môi trường
            </p>
          </div>

          <div className="hero-mascot">
            <Mascot />
          </div>
        </div>

        {/* Bottom bar overlaying hero */}
        <div className="bottom-bar">
          <div className="bottom-bar-inner">
            <div className="stages-info">
              <img src={trophyImg} alt="Trophy" className="trophy-img" />
              <div className="stages-text">
                <h2>HOÀN THÀNH 3 CHẶNG - NHẬN HUY HIỆU XANH</h2>
                <p>Bạn đã sẵn sàng trở thành "Nhà du hành xanh" ?</p>
              </div>
            </div>

            <div className="divider" />

            <div className="leaderboard">
              <h3 className="leaderboard-title">BẢNG XẾP HẠNG</h3>
              <div className="leaderboard-row">
                {leaderboard.map((player) => (
                  <div key={player.rank} className="leaderboard-player">
                    <img src={player.avatar} alt={player.name} className="player-avatar" />
                    <span className="player-label">{player.rank}. {player.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
