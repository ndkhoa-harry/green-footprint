import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, GraduationCap } from 'lucide-react'
import { useUser } from '../context/UserContext'
import Navbar from '../components/Navbar'
import bgImage from '../assets/home_background.png'
import mascotImg from '../assets/mascot_2.png'
import './InputPage.css'

function InputPage() {
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const { saveUser } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !studentId.trim()) return
    saveUser(name.trim(), studentId.trim())
    navigate('/instructions')
  }

  return (
    <div className="input-page">
      <div
        className="input-hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="input-content">
          <img src={mascotImg} alt="Mascot" className="input-mascot" />

          <div className="input-center">
            <h1 className="input-title">
              <span className="leaf-icon">🌿</span>
              JOIN OUR JOURNEY
              <span className="leaf-icon">🌿</span>
            </h1>
            <p className="input-subtitle">
              Hehe, mình là Dứa Nhỏ. Mình có thể gọi bạn là gì đây nhỉ?
            </p>

            <form className="input-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <User size={20} strokeWidth={2} />
                  <span>HỌ VÀ TÊN</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tên của bạn ở đây nè..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <GraduationCap size={20} strokeWidth={2} />
                  <span>MÃ SỐ SINH VIÊN</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập MSSV của bạn nữa nha"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                BẮT ĐẦU
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputPage
