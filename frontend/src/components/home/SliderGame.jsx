import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Card from "../common/Card";

import styles from "../common/Slider.module.css";

export default function SliderGame({ games }) {
  return (
    <ul className={`${styles.slider} ${styles.slider__game}`}>
      {games.map((game) => (
        <li key={game.id}>
          <Link to={`/videos?game=${game.name.toLowerCase()}`}>
            <Card
              classCSS={`${styles.card} ${styles.card__game} bg-cover`}
              styleCSS={{
                backgroundImage: `url(${game.thumbnail})`,
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

SliderGame.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

SliderGame.defaultProps = {
  games: null,
};
