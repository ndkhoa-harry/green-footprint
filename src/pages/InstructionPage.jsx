import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import bgImage from '../assets/home_background.png'

import phase1Icon from '../assets/phase_1_icon.png'
import phase2Icon from '../assets/phase_2_icon.png'
import phase3Icon from '../assets/phase_3_icon.png'

import bullet1 from '../assets/bullet_icon_1.png'
import bullet2 from '../assets/bullet_icon_2.png'
import bullet3 from '../assets/bullet_icon_3.png'
import bullet4 from '../assets/bullet_icon_4.png'
import bullet5 from '../assets/bullet_icon_5.png'
import bullet6 from '../assets/bullet_icon_6.png'
import bullet7 from '../assets/bullet_icon_7.png'

import './InstructionPage.css'

const stages = [
  {
    id: 1,
    label: 'CHẶNG 1',
    icon: phase1Icon,
    title: 'CHẶNG 1: HÀNH TRANG XANH',
    instructions: [
      {
        icon: bullet1,
        text: 'Bạn sẽ được chọn đồ mang theo cho chuyến đi',
      },
      {
        icon: bullet2,
        text: '<b>KÉO THẢ</b> những vật dụng <b>thân thiện với môi trường</b> vào vali để mang theo trong suốt chuyến đi',
      },
      {
        icon: bullet3,
        text: '<b>TRÁNH</b> mang những vật dụng dùng một lần gây <b>ô nhiễm môi trường</b>',
      },
    ],
  },
  {
    id: 2,
    label: 'CHẶNG 2',
    icon: phase2Icon,
    title: 'CHẶNG 2: CUNG ĐƯỜNG XANH',
    instructions: [
      {
        icon: bullet4,
        text: 'Trong chuyến hành trình khám phá, một vài món rác đang bị <b>ẨN</b> quanh bãi biển và khu du lịch.',
      },
      {
        icon: bullet5,
        text: 'Hãy quan sát thật kỹ và <b>NHẤN</b> vào những món rác mà bạn tìm thấy để thu gom chúng vào túi xanh nhé!',
      },
      {
        icon: bullet6,
        text: 'Mỗi món rác tìm được sẽ tự động lưu vào túi thu gom.',
      },
      {
        icon: bullet7,
        text: 'Số rác này sẽ được sử dụng ở <b>chặng tiếp theo</b> để phân loại.',
      },
    ],
  },
  {
    id: 3,
    label: 'CHẶNG 3',
    icon: phase3Icon,
    title: 'CHẶNG 3: PHÂN LOẠI CÙNG MILO',
    instructions: [
      {
        icon: bullet6,
        text: 'Những món rác bạn đã thu gom ở chặng trước đang nằm trong túi xanh.',
      },
      {
        icon: bullet7,
        text: 'Hãy <b>KÉO THẢ</b> từng món rác vào đúng thùng tương ứng.\nMỗi món có <b>10 giây</b>; hết giờ hoặc <b>bỏ nhầm thùng</b> thì bạn sẽ gặp món tiếp theo, món hiện tại xếp lại phía sau nhé!',
        list: ['Rác hữu cơ', 'Rác vô cơ', 'Rác tái chế'],
      },
    ],
  },
]

function InstructionPage() {
  const [activeStage, setActiveStage] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const fromNav = location.state?.fromNav === true
  const current = stages[activeStage]

  const handleSkip = () => {
    if (fromNav) {
      navigate(-1)
      return
    }
    navigate('/map')
  }

  return (
    <div className="instruction-page">
      <div
        className="instruction-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="instruction-content">
          <h1 className="instruction-title">HƯỚNG DẪN CHƠI</h1>

          <div className="instruction-body">
            {/* Left stage tabs */}
            <div className="stage-tabs">
              {stages.map((stage, idx) => (
                <button
                  key={stage.id}
                  className={`stage-tab ${idx === activeStage ? 'active' : ''}`}
                  onClick={() => setActiveStage(idx)}
                >
                  <img src={stage.icon} alt={stage.label} className="stage-tab-icon" />
                  <span className="stage-tab-label">{stage.label}</span>
                </button>
              ))}
            </div>

            {/* Right instruction card */}
            <div className="instruction-card">
              <h2 className="card-title">{current.title}</h2>
              <div className="card-instructions">
                {current.instructions.map((item, idx) => (
                  <div key={idx} className="instruction-item">
                    <img src={item.icon} alt="" className="instruction-bullet-icon" />
                    <div className="instruction-text-block">
                      <p
                        className="instruction-text"
                        dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br/>') }}
                      />
                      {item.list && (
                        <ul className="instruction-list">
                          {item.list.map((li, i) => (
                            <li key={i}><b>{li}</b></li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="skip-button" onClick={handleSkip}>
            SKIP
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstructionPage
