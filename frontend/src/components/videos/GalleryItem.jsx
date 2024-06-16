import { useMemo, useState } from "react";
import PropTypes from "prop-types";

import Button from "../common/Button";
import SliderVideo from "../common/SliderVideo";
import styles from "../common/Slider.module.css";

import isEmpty from "../../utils/isEmpty";
import { filterVideos } from "../../utils/filterTable";

const MAX_VIDEO_DISPLAY = 8;
const INCREMENT = MAX_VIDEO_DISPLAY;

export default function GalleryItem({
  userId,
  sectionTitle,
  videos,
  filterText,
  filterGame,
  filterCategory,
  isAuthRequired,
}) {
  // states to handle 'add more' gallery
  const [videoNumber, setVideoNumber] = useState(MAX_VIDEO_DISPLAY);

  const filteredVideos = useMemo(
    () => filterVideos(videos, filterText, filterGame, filterCategory),
    [videos, filterText, filterGame, filterCategory]
  );

  const isAuthenticated = userId !== undefined;
  const showFeature = !isAuthRequired || (isAuthRequired && isAuthenticated);
  const hasContent = !isEmpty(filteredVideos);
  const hasMoreToShow = videoNumber && videoNumber < filteredVideos.length;

  const showMore = () => setVideoNumber((prevCount) => prevCount + INCREMENT);

  if (showFeature && hasContent) {
    return (
      <article>
        <h1>{sectionTitle}</h1>
        <SliderVideo
          videos={filteredVideos}
          customClassSlider={styles.slider__video}
          customClassCard={styles.card__video}
          customClassOverlayWrapper={styles.overlay__wrapper__grid}
          videoNumber={videoNumber}
          isPaginated
        />
        {hasMoreToShow && (
          <Button
            customCSS="flex flex-col items-center justify-center"
            onClick={showMore}
          >
            <img src="/assets/icon/utility/showMore.svg" alt="show more" />
            Load More
          </Button>
        )}
      </article>
    );
  }
}

GalleryItem.propTypes = {
  userId: PropTypes.number,
  sectionTitle: PropTypes.string.isRequired,
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
  ).isRequired,
  filterText: PropTypes.string.isRequired,
  filterGame: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  filterCategory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
};

GalleryItem.defaultProps = {
  userId: null,
};
