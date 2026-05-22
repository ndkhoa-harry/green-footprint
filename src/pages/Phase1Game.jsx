import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Navbar from '../components/Navbar'
import homeBg from '../assets/home_background.png'
import bedroomBg from '../assets/game_1_background.png'
import mascotIntroImg from '../assets/mascot_1.png'
import mascotHappyImg from '../assets/mascot_4.png'
import mascotSadImg from '../assets/mascot_5.png'
import extractionImg from '../assets/extraction_bottle.png'
import containersImg from '../assets/containers.png'
import reusableBottleImg from '../assets/reusable_bottle.png'
import plasticBottleImg from '../assets/plastic_bottle.png'
import powerBankImg from '../assets/power_bank.png'
import reusableBagImg from '../assets/reusable_bag.png'
import shampooImg from '../assets/shampoo.png'
import wetWipesImg from '../assets/wet_wipes.png'
import './Phase1Game.css'

const INTRO_MESSAGE =
  'Đừng quên chọn những món đồ bảo vệ môi trường nhé bạn iu <3'

const ITEMS = [
  {
    id: 'extraction',
    src: extractionImg,
    good: true,
    message: 'Đem theo lọ chiết như vậy quá tiện mà còn bảo vệ môi trường nữa chứ ^^',
    slot: 0,
  },
  {
    id: 'containers',
    src: containersImg,
    good: true,
    message:
      'Hộp đựng thực phẩm là 1 thay thế hoàn hảo cho hộp xốp. Vì hộp xốp cực kỳ độc hại khi đựng đồ nóng và khó phân hủy đấy!',
    slot: 1,
  },
  {
    id: 'reusable_bottle',
    src: reusableBottleImg,
    good: true,
    message:
      'Mang bình nước cá nhân là bạn đã giúp giảm thiểu việc sử dụng chai nhựa dùng một lần và tiết kiệm chi phí rồi đó <3',
    slot: 2,
  },
  {
    id: 'plastic_bottle',
    src: plasticBottleImg,
    good: false,
    message: 'Có 1 sự thật là nhựa dùng một lần mất đến 500 năm để phân hủy lận đó bé oi!',
    slot: 3,
  },
  {
    id: 'power_bank',
    src: powerBankImg,
    good: true,
    message: 'Good choice! Vừa tiện lợi vừa thân thiện với môi trường nữa đó!',
    slot: 4,
  },
  {
    id: 'reusable_bag',
    src: reusableBagImg,
    good: true,
    message: 'Ýe bạn mang túi vải là hợp lý rồi đóa',
    slot: 5,
  },
  {
    id: 'shampoo',
    src: shampooImg,
    good: false,
    message:
      'Ồ nô, bạn có biết vỏ bao bì dạng gói là loại rác nhựa khó thu gom nhất hông, mình nghĩ bạn nên thay bằng lọ chiết ii',
    slot: 6,
  },
  {
    id: 'wet_wipes',
    src: wetWipesImg,
    good: false,
    message:
      'Úi mình nghĩ bạn nên thay bằng khăn vải vì khăn ướt thường chứa sợi nhựa, dùng khăn vải để có thể tái sử dụng nhé!',
    slot: 7,
  },
]

/** Positions inside suitcase (percent of drop zone) for packed good items */
const SUITCASE_LAYOUT = {
  extraction: { left: '10%', top: '30%', width: '20%' },
  containers: { left: '42%', top: '30%', width: '20%' },
  reusable_bottle: { left: '78%', top: '26%', width: '14%' },
  power_bank: { left: '22%', top: '32%', width: '25%' },
  reusable_bag: { left: '60%', top: '28%', width: '18%' },
}

function pointInRect(x, y, rect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

function Phase1Game() {
  const navigate = useNavigate()
  const { completePhase } = useGame()
  const suitcaseRef = useRef(null)
  const captureRef = useRef({ el: null, pointerId: null })

  const [placement, setPlacement] = useState(() =>
    Object.fromEntries(ITEMS.map((i) => [i.id, 'closet'])),
  )
  const [bubbleMessage, setBubbleMessage] = useState(INTRO_MESSAGE)
  const [mascotMood, setMascotMood] = useState('intro')
  const [drag, setDrag] = useState(null)
  const [rejectFlash, setRejectFlash] = useState(null)

  const mascotImg =
    mascotMood === 'happy'
      ? mascotHappyImg
      : mascotMood === 'sad'
        ? mascotSadImg
        : mascotIntroImg

  const goodIds = useMemo(() => ITEMS.filter((i) => i.good).map((i) => i.id), [])
  const allGoodPacked = useMemo(
    () => goodIds.every((id) => placement[id] === 'suitcase'),
    [placement, goodIds],
  )

  const endDrag = useCallback(
    (clientX, clientY) => {
      if (!drag) return

      const cap = captureRef.current
      if (cap.el && cap.pointerId != null) {
        try {
          cap.el.releasePointerCapture(cap.pointerId)
        } catch {
          /* ignore */
        }
      }
      captureRef.current = { el: null, pointerId: null }

      const item = ITEMS.find((i) => i.id === drag.id)
      if (!item) {
        setDrag(null)
        return
      }

      const suit = suitcaseRef.current?.getBoundingClientRect()
      const overSuitcase = suit && pointInRect(clientX, clientY, suit)

      if (overSuitcase) {
        if (placement[item.id] === 'suitcase') {
          setDrag(null)
          return
        }
        setBubbleMessage(item.message)
        if (item.good) {
          setMascotMood('happy')
          setPlacement((p) => ({ ...p, [item.id]: 'suitcase' }))
        } else {
          setMascotMood('sad')
          setRejectFlash(item.id)
          setTimeout(() => setRejectFlash(null), 450)
        }
      }

      setDrag(null)
    },
    [drag, placement],
  )

  useEffect(() => {
    if (!drag) return
    const onMove = (e) => {
      setDrag((d) =>
        d
          ? {
              ...d,
              x: e.clientX,
              y: e.clientY,
            }
          : null,
      )
    }
    const onUp = (e) => {
      endDrag(e.clientX, e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [drag, endDrag])

  const onItemPointerDown = (e, item) => {
    if (placement[item.id] === 'suitcase') return
    e.preventDefault()
    captureRef.current = { el: e.currentTarget, pointerId: e.pointerId }
    e.currentTarget.setPointerCapture(e.pointerId)
    const rect = e.currentTarget.getBoundingClientRect()
    setDrag({
      id: item.id,
      x: e.clientX,
      y: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    })
  }

  const handleContinue = () => {
    completePhase(1)
    navigate('/map')
  }

  return (
    <div
      className="phase1-page"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <div className="phase1-body">
        <div className="phase1-scene">
          <img src={bedroomBg} alt="" className="phase1-bg" draggable={false} />

          <div className="phase1-closet-grid" aria-hidden>
            {ITEMS.map((item) => (
              <div key={item.slot} className="phase1-slot">
                {placement[item.id] === 'closet' && drag?.id !== item.id && (
                  <button
                    type="button"
                    className={`phase1-item phase1-item--closet ${rejectFlash === item.id ? 'phase1-item--reject' : ''}`}
                    onPointerDown={(e) => onItemPointerDown(e, item)}
                  >
                    <img src={item.src} alt="" draggable={false} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="phase1-suitcase" ref={suitcaseRef} aria-hidden>
            {ITEMS.filter((i) => placement[i.id] === 'suitcase').map((item) => {
              const layout = SUITCASE_LAYOUT[item.id]
              if (!layout) return null
              return (
                <div
                  key={item.id}
                  className="phase1-item phase1-item--suitcase"
                  style={{
                    left: layout.left,
                    top: layout.top,
                    width: layout.width,
                  }}
                >
                  <img src={item.src} alt="" draggable={false} />
                </div>
              )
            })}
          </div>

          <div className="phase1-mascot-block">
            <div className="phase1-bubble">
              <p>{bubbleMessage}</p>
            </div>
            <img src={mascotImg} alt="Milo" className="phase1-mascot" draggable={false} />
          </div>

          {drag && (
            <div
              className="phase1-drag-ghost"
              style={{
                left: drag.x - drag.offsetX,
                top: drag.y - drag.offsetY,
                width: drag.width,
                height: drag.height,
              }}
            >
              <img
                src={ITEMS.find((i) => i.id === drag.id)?.src}
                alt=""
                draggable={false}
              />
            </div>
          )}

          {allGoodPacked && (
            <div className="phase1-complete">
              <p>Bạn đã chọn đủ đồ xanh cho chuyến đi!</p>
              <button type="button" className="phase1-continue" onClick={handleContinue}>
                Tiếp tục
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Phase1Game
