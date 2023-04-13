import "./assets/wheel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Wheel() {
  return <div className="container">
    <div className="menu-wheel" id="wheel">
      <span className="menu-options top">MENU</span>

      <span className="menu-options right">
        <FontAwesomeIcon icon="fa-solid fa-forward-fast" />
      </span>

      <span className="menu-options left">
        <FontAwesomeIcon icon="fa-solid fa-forward-fast" rotation={180} />
      </span>

      <span className="menu-options bottom">
        <FontAwesomeIcon icon="fa-solid fa-play" />
        <FontAwesomeIcon icon="fa-solid fa-pause" />
      </span>

      <div className="okay"></div>
    </div>
  </div>;
}

export default Wheel;
