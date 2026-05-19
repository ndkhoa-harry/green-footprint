import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import Navbar from '../components/Navbar'
import homeBg from '../assets/home_background.png'
import instrBg from '../assets/game_3_scene_1.png'
import playBg from '../assets/game_3_scene_2.png'
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
import './Phase3Game.css'

const ITEM_SECONDS = 10

const INSTRUCTION_BUBBLE_TEXT =
  'Hãy kéo từng món rác vào đúng thùng: hữu cơ, vô cơ hoặc tái chế. Mỗi món có 10 giây — hết giờ hoặc bỏ nhầm thùng thì bạn sẽ gặp món tiếp theo, món hiện tại xếp lại phía sau nhé ✨'

/**
 * Full pool from chặng 2 (12 props). Each has one correct bin — adjust `bin` to match your curriculum.
 * Play uses 6 per round: 2 organic + 2 inorganic + 2 recyclable (random which props from each group).
 */
const ALL_TRASH_POOL = [
  { id: 'trash-1', src: t1, bin: 'inorganic' },
  { id: 'trash-2', src: t2, bin: 'organic' },
  { id: 'trash-3', src: t3, bin: 'organic' },
  { id: 'trash-4', src: t4, bin: 'inorganic' },
  { id: 'trash-5', src: t5, bin: 'inorganic' },
  { id: 'trash-6', src: t6, bin: 'inorganic' },
  { id: 'trash-7', src: t7, bin: 'recyclable' },
  { id: 'trash-8', src: t8, bin: 'inorganic' },
  { id: 'trash-9', src: t9, bin: 'inorganic' },
  { id: 'trash-10', src: t10, bin: 'recyclable' },
  { id: 'trash-11', src: t11, bin: 'recyclable' },
  { id: 'trash-12', src: t12, bin: 'organic' },
]

/** Pick 6 items: two from each bin type, then shuffle play order. */
function pickSixBalanced(pool) {
  const by = { organic: [], inorganic: [], recyclable: [] }
  for (const item of pool) {
    by[item.bin].push(item)
  }
  const takeTwo = (arr) => shuffle([...arr]).slice(0, 2)
  return shuffle([
    ...takeTwo(by.organic),
    ...takeTwo(by.inorganic),
    ...takeTwo(by.recyclable),
  ])
}

const BINS = [
  { key: 'organic', label: 'RÁC HỮU CƠ' },
  { key: 'inorganic', label: 'RÁC VÔ CƠ' },
  { key: 'recyclable', label: 'RÁC TÁI CHẾ' },
]

function pointInRect(x, y, rect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Put front item at end of queue (timeout or wrong bin). */
function moveFrontToBack(q) {
  if (q.length === 0) return q
  const [head, ...tail] = q
  return [...tail, head]
}

function releasePointerCaptureFromRef(captureRef) {
  const cap = captureRef.current
  if (cap.el && cap.pointerId != null) {
    try {
      cap.el.releasePointerCapture(cap.pointerId)
    } catch {
      /* ignore */
    }
  }
  captureRef.current = { el: null, pointerId: null }
}

function Phase3Game() {
  const navigate = useNavigate()
  const { completePhase } = useGame()

  const [scene, setScene] = useState('instruction')
  const [queue, setQueue] = useState([])
  const [timeLeft, setTimeLeft] = useState(ITEM_SECONDS)
  const [drag, setDrag] = useState(null)
  /** Wrong bin or timeout: item wiggles & vanishes here, then queue advances. */
  const [penaltyItem, setPenaltyItem] = useState(null)

  const captureRef = useRef({ el: null, pointerId: null })
  const penaltyAnimDoneRef = useRef(false)
  const trashHomeRef = useRef(null)
  const timeoutPenaltyLatchRef = useRef(false)
  const binOrganicRef = useRef(null)
  const binInorganicRef = useRef(null)
  const binRecyclableRef = useRef(null)

  const binRefMap = {
    organic: binOrganicRef,
    inorganic: binInorganicRef,
    recyclable: binRecyclableRef,
  }

  const current = queue[0] ?? null
  const done = scene === 'play' && queue.length === 0

  useEffect(() => {
    if (scene !== 'play' || !current) return
    setTimeLeft(ITEM_SECONDS)
  }, [scene, current?.id])

  useEffect(() => {
    if (scene !== 'play' || !current || done || penaltyItem) return
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) return 0
        return t - 0.1
      })
    }, 100)
    return () => window.clearInterval(id)
  }, [scene, current?.id, done, penaltyItem])

  /** Time's up: same wiggle + vanish as wrong bin, then advance queue. */
  useEffect(() => {
    if (scene !== 'play' || !current || done || penaltyItem) return
    if (timeLeft > 0.05) {
      timeoutPenaltyLatchRef.current = false
      return
    }
    if (timeoutPenaltyLatchRef.current) return
    timeoutPenaltyLatchRef.current = true

    penaltyAnimDoneRef.current = false

    if (drag) {
      releasePointerCaptureFromRef(captureRef)
      setPenaltyItem({
        src: current.src,
        left: drag.x - drag.offsetX,
        top: drag.y - drag.offsetY,
        width: drag.width,
        height: drag.height,
      })
      setDrag(null)
      return
    }

    const el = trashHomeRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      setPenaltyItem({
        src: current.src,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      })
    } else {
      penaltyAnimDoneRef.current = true
      setTimeLeft(ITEM_SECONDS)
      setQueue((q) => moveFrontToBack(q))
      timeoutPenaltyLatchRef.current = false
    }
  }, [scene, current?.id, current?.src, done, penaltyItem, timeLeft, drag])

  const startPlay = () => {
    setPenaltyItem(null)
    timeoutPenaltyLatchRef.current = false
    setQueue(pickSixBalanced(ALL_TRASH_POOL).map((item) => ({ ...item })))
    setScene('play')
    setTimeLeft(ITEM_SECONDS)
  }

  const handlePenaltyAnimationEnd = useCallback((e) => {
    if (e.target !== e.currentTarget) return
    if (penaltyAnimDoneRef.current) return
    penaltyAnimDoneRef.current = true
    setTimeLeft(ITEM_SECONDS)
    setQueue((q) => moveFrontToBack(q))
    setPenaltyItem(null)
  }, [])

  const endDrag = useCallback(
    (clientX, clientY) => {
      releasePointerCaptureFromRef(captureRef)

      if (!drag || !current) {
        setDrag(null)
        return
      }

      let matched = null
      for (const { key } of BINS) {
        const el = binRefMap[key].current
        const rect = el?.getBoundingClientRect()
        if (rect && pointInRect(clientX, clientY, rect)) {
          matched = key
          break
        }
      }

      if (matched === current.bin) {
        setQueue((q) => q.slice(1))
      } else if (matched != null) {
        penaltyAnimDoneRef.current = false
        setPenaltyItem({
          src: current.src,
          left: drag.x - drag.offsetX,
          top: drag.y - drag.offsetY,
          width: drag.width,
          height: drag.height,
        })
      }

      setDrag(null)
    },
    [drag, current],
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

  const onTrashPointerDown = (e) => {
    if (!current || done || penaltyItem) return
    e.preventDefault()
    captureRef.current = { el: e.currentTarget, pointerId: e.pointerId }
    e.currentTarget.setPointerCapture(e.pointerId)
    const rect = e.currentTarget.getBoundingClientRect()
    setDrag({
      id: current.id,
      x: e.clientX,
      y: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    })
  }

  const handleContinue = () => {
    completePhase(3)
    navigate('/results')
  }

  const timerRatio = Math.max(0, Math.min(1, timeLeft / ITEM_SECONDS))
  const timerLabel = Math.max(0, Math.ceil(timeLeft))

  return (
    <div
      className="phase3-page"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <div className="phase3-body">
        {scene === 'instruction' && (
          <div className="phase3-scene phase3-scene--instruction">
            <img src={instrBg} alt="" className="phase3-bg" draggable={false} />
            <div className="phase3-instruction-bubble-wrap" role="region" aria-label="Hướng dẫn chặng 3">
              <div className="phase3-instruction-bubble">
                <p>{INSTRUCTION_BUBBLE_TEXT}</p>
              </div>
            </div>
            <div className="phase3-instruction-footer">
              <button type="button" className="phase3-start" onClick={startPlay}>
                BẮT ĐẦU
              </button>
            </div>
          </div>
        )}

        {scene === 'play' && (
          <div className="phase3-scene phase3-scene--play">
            <img src={playBg} alt="" className="phase3-bg" draggable={false} />

            <div className="phase3-timer" aria-label={`Thời gian còn ${timerLabel} giây`}>
              <div className="phase3-timer-track">
                <div
                  className="phase3-timer-fill"
                  style={{ transform: `scaleX(${timerRatio})` }}
                />
              </div>
              <span className="phase3-timer-value">{timerLabel}s</span>
            </div>

            <div className="phase3-bins-layer" aria-hidden>
              {BINS.map(({ key, label }) => (
                <div
                  key={key}
                  ref={binRefMap[key]}
                  className={`phase3-bin-hit phase3-bin-hit--${key}`}
                  title={label}
                />
              ))}
            </div>

            {current && !done && !drag && !penaltyItem && (
              <div className="phase3-trash-anchor">
                <button
                  ref={trashHomeRef}
                  type="button"
                  className="phase3-trash-home"
                  onPointerDown={onTrashPointerDown}
                  aria-label="Kéo rác vào thùng phù hợp"
                >
                  <img src={current.src} alt="" draggable={false} />
                </button>
              </div>
            )}

            {drag && current && (
              <div
                className="phase3-trash-float"
                style={{
                  width: drag.width,
                  height: drag.height,
                  left: drag.x - drag.offsetX,
                  top: drag.y - drag.offsetY,
                }}
              >
                <img src={current.src} alt="" draggable={false} />
              </div>
            )}

            {penaltyItem && (
              <div
                className="phase3-penalty-float"
                style={{
                  left: penaltyItem.left,
                  top: penaltyItem.top,
                  width: penaltyItem.width,
                  height: penaltyItem.height,
                }}
                aria-hidden
              >
                <div
                  className="phase3-penalty-float-inner"
                  onAnimationEnd={handlePenaltyAnimationEnd}
                >
                  <img src={penaltyItem.src} alt="" draggable={false} />
                </div>
              </div>
            )}

            {done && (
              <div className="phase3-complete">
                <button type="button" className="phase3-continue" onClick={handleContinue}>
                  Tiếp tục
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Phase3Game
