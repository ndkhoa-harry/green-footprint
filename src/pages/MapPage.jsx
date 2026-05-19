import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Navbar from '../components/Navbar'
import bgImage from '../assets/home_background.png'
import mapImg from '../assets/map.png'
import mascotImg from '../assets/mascot_2.png'
import './MapPage.css'

const stagePositions = [
  { top: '34%', left: '17%' },
  { top: '50%', left: '53%' },
  { top: '75%', left: '84%' },
]

const mascotPositions = [
  { top: '32%', left: '26%' },
  { top: '50%', left: '44%' },
  { top: '58%', left: '74%' },
]

function MapPage() {
  const navigate = useNavigate()
  const { gameState, isPhaseCompleted } = useGame()
  const currentIdx = gameState.currentPhase - 1
  const mascotPos = mascotPositions[Math.min(currentIdx, 2)]
  const allPhasesComplete = [1, 2, 3].every((p) => isPhaseCompleted(p))

  const handleStageClick = (phase) => {
    if (allPhasesComplete || phase === gameState.currentPhase) {
      navigate(`/phase/${phase}`)
    }
  }

  return (
    <div className="map-page">
      <div
        className="map-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="map-content">
          <div className="map-frame">
            <img src={mapImg} alt="Game Map" className="map-image" />

            {/* Clickable stage hotspots */}
            {stagePositions.map((pos, idx) => {
              const phase = idx + 1
              const completed = isPhaseCompleted(phase)
              const isCurrent = phase === gameState.currentPhase
              const isLocked = !allPhasesComplete && phase > gameState.currentPhase

              return (
                <button
                  key={phase}
                  className={`stage-hotspot ${completed ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''} ${allPhasesComplete ? 'replay' : ''}`}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => handleStageClick(phase)}
                  disabled={isLocked}
                  title={`Chặng ${phase}`}
                >
                  {completed && <span className="check-mark">✓</span>}
                  {isCurrent && <span className="pulse-ring" />}
                </button>
              )
            })}

            {/* Mascot */}
            <div
              className="map-mascot"
              style={{ top: mascotPos.top, left: mascotPos.left }}
            >
              <img src={mascotImg} alt="Mascot" className="map-mascot-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage
