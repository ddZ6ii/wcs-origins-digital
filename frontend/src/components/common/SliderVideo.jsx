import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "./Card";

import useAuth from "../../hooks/useAuth";

import styles from "./Slider.module.css";

// algo details:
// 1) case admin (full access)
// 2) case user...
//  2.a) not connected (only access to video with visibility 0)
//  2.b) connected freemium (access to video with visibility 0 and 1 and favorites)
//  2.c) connected premium (access to video with visibility 0, 1 and 2 and favorites)

// plan info
// not connected -> id_plan = null, role = null
// connected as admin -> id_plan = null, role = 1
// connected as freemium -> id_plan = [1, 2], role = 0
// connected as premium -> id_plan = 3, role = 0

export default function SliderVideo({
  videos,
  customClassSlider,
  customClassCard,
  customClassOverlayWrapper,
  videoNumber,
  isPaginated,
}) {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, isPremium } = useAuth();

  const videosToDisplay = isPaginated ? videos.slice(0, videoNumber) : videos;

  const hasFullAccess = isLoggedIn && (isAdmin || isPremium);

  const isFreeContent = (videoVisibility) => videoVisibility === 0;
  const isPremiumContent = (videoVisibility) => videoVisibility === 2;
  const hasAccess = (videoVisibility) => {
    if (hasFullAccess) return true;
    if (isFreeContent(videoVisibility)) return true;
    if (isLoggedIn && !isPremium && !isPremiumContent(videoVisibility))
      return true;
    return false;
  };
  const requireLogin = (videoVisibility) =>
    !isLoggedIn && videoVisibility !== 0;
  const requirePremium = (videoVisibility) =>
    isLoggedIn && !isPremium && !isAdmin && videoVisibility === 2;

  const handleShowVideo = (video) => {
    if (requireLogin(video.visibility)) return navigate("/account");

    if (requirePremium(video.visibility)) return navigate("/plans");
    return navigate(`/videos/${video.id}`);
  };

  return (
    <ul className={`${styles.slider} ${customClassSlider}`}>
      {videosToDisplay.map((video) => (
        <li key={video.id}>
          <button
            type="button"
            className="w-full"
            onClick={() => handleShowVideo(video)}
          >
            <Card
              classCSS={`${styles.card} ${customClassCard} bg-cover`}
              styleCSS={{
                backgroundImage: `url(${video.thumbnail})`,
              }}
            >
              {!hasAccess(video.visibility) ? (
                <div className={styles.card__overlay}>
                  <div
                    className={`${styles.overlay__wrapper} ${customClassOverlayWrapper}`}
                  >
                    <img
                      src="./src/assets/icon/utility/lock.svg"
                      alt={video.title}
                      className={styles.overlay__wrapper__lock}
                    />
                    {requireLogin(video.visibility) ? (
                      <p className={styles.overlay__wrapper__description}>
                        Login to watch
                      </p>
                    ) : null}

                    {requirePremium(video.visibility) ? (
                      <p className={styles.overlay__wrapper__description}>
                        Become premium to watch
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </Card>
            <p className={styles.slider__video__title}>{video.title}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

SliderVideo.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      upload_date: PropTypes.string,
      description: PropTypes.string,
      slug: PropTypes.string,
      status: PropTypes.string,
      thumbnail: PropTypes.string,
      url_video: PropTypes.string,
      game_id: PropTypes.number,
      language_id: PropTypes.number,
    })
  ),
  customClassSlider: PropTypes.string,
  customClassCard: PropTypes.string,
  customClassOverlayWrapper: PropTypes.string,
  videoNumber: PropTypes.number,
  isPaginated: PropTypes.bool,
};

SliderVideo.defaultProps = {
  videos: null,
  customClassSlider: "",
  customClassCard: "",
  customClassOverlayWrapper: "",
  videoNumber: null,
  isPaginated: false,
};
