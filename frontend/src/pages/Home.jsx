import { useMemo } from "react";

import Footer from "../components/common/Footer";
import Hero from "../components/home/Hero";
import Loader from "../components/common/Loader";
import Partners from "../components/home/Partners";
import SliderGame from "../components/home/SliderGame";
import SliderVideo from "../components/common/SliderVideo";

import useAxios from "../hooks/useAxios";

import isEmpty from "../utils/isEmpty";

import styles from "../components/common/Slider.module.css";

export default function Home() {
  // fetch video data from database
  const { data: games, isLoading: areGamesLoading } = useAxios("/games");
  const { data: promotedVideos, isLoading: arePomotedLoading } = useAxios(
    "/videos?isPromoted=1"
  );
  const { data: popularVideos, isLoading: arePopularLoading } = useAxios(
    "/videos?isPopular=1&treshold=1"
  );

  const gameContent = useMemo(() => {
    if (areGamesLoading)
      return <Loader fullHeight={false} message="Loading games..." />;

    const hasNoContent = !areGamesLoading && isEmpty(games);
    if (hasNoContent)
      return <p className="my-4 text-center">Sorry... No available games</p>;

    return <SliderGame games={games} />;
  }, [games, areGamesLoading]);

  const promotedVideoContent = useMemo(() => {
    if (arePomotedLoading)
      return <Loader fullHeight={false} message="Loading videos..." />;

    const hasNoContent = !arePomotedLoading && isEmpty(promotedVideos);
    if (hasNoContent)
      return <p className="my-4 text-center">Sorry... No available videos</p>;

    return (
      <SliderVideo
        customClassSlider={styles.slider__video}
        customClassCard={styles.card__video}
        customClassOverlayWrapper={styles.overlay__wrapper__grid}
        videos={promotedVideos}
      />
    );
  }, [promotedVideos, arePomotedLoading]);

  const popularVideoContent = useMemo(() => {
    if (arePopularLoading)
      return <Loader fullHeight={false} message="Loading videos..." />;

    const hasNoContent = !arePopularLoading && isEmpty(promotedVideos);
    if (hasNoContent)
      return <p className="my-4 text-center">Sorry... No available videos</p>;

    return (
      <SliderVideo
        customClassSlider={styles.slider__video}
        customClassCard={styles.card__video}
        customClassOverlayWrapper={styles.overlay__wrapper__grid}
        videos={popularVideos}
      />
    );
  }, [promotedVideos, arePopularLoading]);

  return (
    <>
      <Hero />

      <section className="home">
        <article>
          <h1>Games</h1>
          {gameContent}
        </article>
        <article>
          <h1>Promoted Videos</h1>
          {promotedVideoContent}
        </article>
        <article>
          <h1>Popular Videos</h1>
          {popularVideoContent}
        </article>
      </section>

      <Partners />

      <Footer />
    </>
  );
}
