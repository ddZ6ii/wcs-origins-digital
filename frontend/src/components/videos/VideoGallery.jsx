import { useEffect } from "react";
import PropTypes from "prop-types";

import GalleryItem from "./GalleryItem";

import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

export default function VideoGallery({
  filterText,
  filterGame,
  filterCategory,
  areVideosLoading,
}) {
  const {
    account: { id_user: userId },
  } = useAuth();

  // fetch video data from database
  const { data: premiumVideos, isLoading: arePremiumVideosLoading } =
    useAxios("/videos/premium");
  const { data: freemiumVideos, isLoading: areFreemiumVideosLoading } =
    useAxios("/videos/freemium");
  const { data: favoriteVideos, isLoading: areFavVideosLoading } = useAxios(
    `/user-video/${userId}`
  );

  const items = [
    {
      id: 1,
      sectionTitle: "Premium Videos",
      videos: premiumVideos,
      isAuthRequired: false,
    },
    {
      id: 2,
      sectionTitle: "Freemium Videos",
      videos: freemiumVideos,
      isAuthRequired: false,
    },
    {
      id: 3,
      sectionTitle: "Favorites Videos",
      videos: favoriteVideos,
      isAuthRequired: true,
    },
  ];

  // inform parent component when done with fetching video data from database
  useEffect(() => {
    if (
      !areFavVideosLoading &&
      !arePremiumVideosLoading &&
      !areFreemiumVideosLoading
    )
      areVideosLoading(false);
  }, [areFavVideosLoading, arePremiumVideosLoading, areFreemiumVideosLoading]);

  return (
    <>
      {items.map((item) => (
        <GalleryItem
          key={item.id}
          userId={userId}
          sectionTitle={item.sectionTitle}
          videos={item.videos}
          filterText={filterText}
          filterGame={filterGame}
          filterCategory={filterCategory}
          isAuthRequired={item.isAuthRequired}
          isPaginated={item.isPaginated}
        />
      ))}
    </>
  );
}

VideoGallery.propTypes = {
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
  areVideosLoading: PropTypes.func.isRequired,
};
