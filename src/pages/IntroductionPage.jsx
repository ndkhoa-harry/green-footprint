import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import bgImage from '../assets/home_background.png'
import titleImg from '../assets/introduction_title.png'
import badgeImg from '../assets/badge.png'
import mascotImg from '../assets/mascot_3.png'
import './IntroductionPage.css'

function IntroductionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromNav = location.state?.fromNav === true

  const handleSkip = () => {
    if (fromNav) {
      navigate(-1)
      return
    }
    navigate('/input')
  }

  return (
    <div className="introduction-page">
      <div
        className="introduction-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="introduction-content">
          <header className="introduction-header">
            <img
              src={titleImg}
              alt="Đôi điều về GREEN FOOTPRINT"
              className="introduction-title-img"
              draggable={false}
            />
          </header>

          <div className="introduction-stage">
            <div className="introduction-card-wrap">
              <img
                src={mascotImg}
                alt="Milo"
                className="introduction-mascot"
                draggable={false}
              />

              <article className="introduction-card">
              <img
                src={badgeImg}
                alt=""
                className="introduction-card-watermark"
                draggable={false}
              />
              <div className="introduction-card-body">
                <p>
                  <strong>&quot;GREEN FOOTPRINT&quot;</strong> là một trò chơi nhỏ lấy cảm
                  hứng từ những chuyến đi du lịch tình nguyện và tinh thần du lịch trách
                  nhiệm.
                </p>
                <p>
                  Trong hành trình này, người chơi sẽ cùng Milo khám phá các địa điểm du
                  lịch, thu gom rác thải và học cách phân loại rác đúng cách để góp phần
                  bảo vệ môi trường 🌍
                </p>
                <p>
                  Thông qua 3 chặng chơi đơn giản nhưng ý nghĩa, &quot;Dấu Chân Xanh&quot;
                  mong muốn lan tỏa thông điệp:
                </p>
                <p className="introduction-quote">
                  💚 <strong>&quot;Từ những bước chân nhỏ, chúng ta gieo nên một hành trình xanh&quot;</strong>
                </p>
                <p>
                  Hy vọng rằng sau mỗi hành trình, chúng ta không chỉ mang về những kỷ
                  niệm đẹp mà còn để lại những điều tốt đẹp cho nơi mình đi qua 🌿
                </p>
              </div>
              </article>
            </div>
          </div>

          <button type="button" className="introduction-skip-btn" onClick={handleSkip}>
            SKIP
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntroductionPage
