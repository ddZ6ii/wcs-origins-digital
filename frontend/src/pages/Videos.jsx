import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Filters from "../components/videos/Filters";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import VideoGallery from "../components/videos/VideoGallery";

import * as Games from "../services/games";
import isEmpty from "../utils/isEmpty";

export default function Videos() {
  // retrieve query parameters from URL
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterText, setFilterText] = useState("");
  const [filterGame, setFilterGame] = useState({});
  const [filterCategory, setFilterCategory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFilterText = (text) => setFilterText(text);

  const handleChangeCategory = (e) => {
    const { value: name } = e.target;
    const id = Number(e.target.getAttribute("data-key"));

    const clonedFilterByCategory = [...filterCategory];
    const index = clonedFilterByCategory.findIndex((el) => el.id === id);
    const updatedArray =
      index === -1
        ? [...clonedFilterByCategory, { id, name }]
        : clonedFilterByCategory.filter((category) => category.id !== id);

    setFilterCategory(updatedArray);
  };

  const handleChangeGame = (e) => {
    const id = Number(e.target.getAttribute("data-key"));
    const { id: name } = e.target;
    setFilterGame({ id, name });
    setSearchParams("");
  };

  const handleLoadingVideos = (bool) => setIsLoading(bool);

  const resetCatFilters = () => setFilterCategory([]);

  const resetGameFilters = () => {
    setFilterGame({});
    setSearchParams("");
  };

  // filter results by game URL query parameter (if any)
  useEffect(() => {
    const getRequestedGame = async (gameName) => {
      try {
        const {
          data: [requestedGame],
        } = await Games.getByName(gameName);
        if (!isEmpty(requestedGame))
          setFilterGame({ id: requestedGame.id, name: requestedGame.name });
      } catch (err) {
        console.error(err);
      }
    };
    const gameName = searchParams.get("game");
    if (gameName) getRequestedGame(gameName);
  }, []);

  return (
    <>
      <section className="min-h-[calc(100vh-160px)]">
        <Filters
          filterText={filterText}
          onChangeFilterText={handleChangeFilterText}
          onChangeCategory={handleChangeCategory}
          onResetCategory={resetCatFilters}
          onChangeGame={handleChangeGame}
          onResetGame={resetGameFilters}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <VideoGallery
            filterText={filterText}
            filterGame={filterGame}
            filterCategory={filterCategory}
            areVideosLoading={handleLoadingVideos}
          />
        )}
      </section>
      <Footer />
    </>
  );
}
