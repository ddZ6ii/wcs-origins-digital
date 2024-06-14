import { useState, useEffect } from "react";

import Footer from "../components/common/Footer";
import Hero from "../components/home/Hero";
import Loader from "../components/common/Loader";
import Partners from "../components/home/Partners";
import SliderGame from "../components/home/SliderGame";
import SliderVideo from "../components/common/SliderVideo";

import * as Services from "../services/account";

// Style
import styles from "../components/common/Slider.module.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [promotedVideos, setPromotedVideos] = useState([]);
  const [popularVideos, setPopularVideos] = useState([]);

  useEffect(() => {
    Services.getAllGames().then((res) => {
      setGames(res);
    });
    Services.getPromotedVideos().then((res) => {
      setPromotedVideos(res);
    });

    Services.getPopularVideos().then((res) => {
      setPopularVideos(res);
    });
  }, []);

  return (
    <>
      {games.length === 0 &&
      promotedVideos.length === 0 &&
      popularVideos.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Hero />
          <section className="home">
            <article>
              <h1>Games</h1>
              <SliderGame games={games} />
            </article>
            <article>
              <h1>Promoted Videos</h1>
              <SliderVideo
                customClassSlider={styles.slider__video}
                customClassCard={styles.card__video}
                customClassOverlayWrapper={styles.overlay__wrapper__grid}
                videos={promotedVideos}
              />
            </article>
            <article>
              <h1>Popular Videos</h1>
              <SliderVideo
                customClassSlider={styles.slider__video}
                customClassCard={styles.card__video}
                customClassOverlayWrapper={styles.overlay__wrapper__grid}
                videos={popularVideos}
              />
            </article>
          </section>
          <Partners />
        </>
      )}
      <Footer />
    </>
  );
}
