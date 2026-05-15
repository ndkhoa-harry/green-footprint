import mascotImg from '../assets/mascot_1.png'
import './Mascot.css'

function Mascot() {
  return (
    <div className="mascot-wrapper">
      <div className="speech-bubble">
        <p>Chuyến du lịch sẽ ý nghĩa hơn khi chúng ta quan tâm đến môi trường đó !</p>
        <div className="bubble-tail" />
      </div>

      <div className="mascot">
        <img
          src={mascotImg}
          alt="Mascot cốc xanh"
          className="mascot-img"
        />
      </div>
    </div>
  )
}

export default Mascot
