import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Navbar from '../components/Navbar'
import homeBg from '../assets/home_background.png'
import sceneBg from '../assets/game_2_background.png'
import rockImg from '../assets/rock.png'
import mascotImg from '../assets/mascot_3.png'
import t1 from '../assets/trash_1.png'
import t2 from '../assets/trash_2.png'
import t3 from '../assets/trash_3.png'
import t4 from '../assets/trash_4.png'
import t5 from '../assets/trash_5.png'
import t6 from '../assets/trash_6.png'
import t7 from '../assets/trash_7.png'
import t8 from '../assets/trash_8.png'
import t9 from '../assets/trash_9.png'
import t10 from '../assets/trash_10.png'
import t11 from '../assets/trash_11.png'
import t12 from '../assets/trash_12.png'
import './Phase2Game.css'

const MASCOT_MESSAGE =
  'Nhiều rác thật đó, hãy cùng nhau dọn sạch chúng để giữ gìn cảnh đẹp này nhé'

/**
 * Positions from design (game_2.png): (x,y) = center of each item, % of scene.
 * Trash 11 = utensil behind left rock; trash 12 = chips behind right rock.
 */
const TRASH_ITEMS = [
  { id: 1, src: t1, left: '25%', top: '60%', width: '3%', underRock: false },
  { id: 2, src: t2, left: '15%', top: '70%', width: '3%', underRock: false },
  { id: 3, src: t11, left: '57%', top: '73%', width: '4%', underRock: false },
  { id: 4, src: t4, left: '74%', top: '57%', width: '3%', underRock: false },
  { id: 5, src: t5, left: '69%', top: '70%', width: '5.5%', underRock: false },
  { id: 6, src: t6, left: '45%', top: '60%', width: '3%', underRock: false },
  { id: 7, src: t7, left: '10%', top: '50%', width: '3%', underRock: false },
  { id: 8, src: t8, left: '8%', top: '80%', width: '4%', underRock: false },
  { id: 9, src: t12, left: '5%', top: '65%', width: '2%', underRock: false },
  { id: 10, src: t10, left: '72%', top: '94%', width: '3%', underRock: false },
  { id: 11, src: t3, left: '22%', top: '89%', width: '5%', underRock: true },
  { id: 12, src: t9, left: '88%', top: '75%', width: '4%', underRock: true },
]

function Phase2Game() {
  const navigate = useNavigate()
  const { completePhase } = useGame()
  const [picked, setPicked] = useState(() => new Set())

  const count = picked.size
  const done = count >= 12

  const trash11 = useMemo(() => TRASH_ITEMS.find((t) => t.id === 11), [])
  const trash12 = useMemo(() => TRASH_ITEMS.find((t) => t.id === 12), [])
  const onTop = useMemo(
    () => TRASH_ITEMS.filter((t) => t.id !== 11 && t.id !== 12).sort((a, b) => a.id - b.id),
    [],
  )

  const handlePick = (id) => {
    if (picked.has(id) || done) return
    setPicked((prev) => new Set([...prev, id]))
  }

  const handleContinue = () => {
    completePhase(2)
    navigate('/map')
  }

  const renderTrash = (item) => {
    if (!item) return null
    const isPicked = picked.has(item.id)
    return (
      <button
        key={item.id}
        type="button"
        className={`phase2-trash ${item.underRock ? 'phase2-trash--under-rock' : ''} ${isPicked ? 'phase2-trash--picked' : ''}`}
        style={{ left: item.left, top: item.top, width: item.width }}
        onClick={() => handlePick(item.id)}
        aria-label={`Thu gom rác ${item.id}`}
        disabled={isPicked}
      >
        <img src={item.src} alt="" draggable={false} />
      </button>
    )
  }

  return (
    <div
      className="phase2-page"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <div className="phase2-body">
        <div className="phase2-scene">
          <img src={sceneBg} alt="" className="phase2-bg" draggable={false} />

          <div className="phase2-hud">
            <div className="phase2-banner">CHẶNG 2</div>
            <div className="phase2-counter-box">
              <span className="phase2-counter-label">ĐÃ THU GOM</span>
              <span className="phase2-counter-value">
                {String(count).padStart(2, '0')}/12
              </span>
            </div>
          </div>

          <div className="phase2-mascot-block">
            <div className="phase2-bubble">
              <p>{MASCOT_MESSAGE}</p>
            </div>
            <img src={mascotImg} alt="Dứa Nhỏ" className="phase2-mascot" draggable={false} />
          </div>

          <div className="phase2-items-layer" aria-hidden>
            {renderTrash(trash11)}
            <img src={rockImg} alt="" className="phase2-rock phase2-rock--left" draggable={false} />
            {renderTrash(trash12)}
            <img src={rockImg} alt="" className="phase2-rock phase2-rock--right" draggable={false} />
            {onTop.map((item) => renderTrash(item))}
          </div>

          {done && (
            <div className="phase2-complete">
              <button type="button" className="phase2-continue" onClick={handleContinue}>
                Tiếp tục
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Phase2Game
