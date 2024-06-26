import PropTypes from "prop-types";
import { useState } from "react";

import Searchbar from "../common/Searchbar";
import Button from "../common/Button";
import ModalVideo from "./video/ModalVideo";
import ModalCategory from "./category/ModalCategory";
import ModalLanguage from "./language/ModalLanguage";
import ModalGame from "./game/ModalGame";

export default function RowSearch({
  activeTab,
  filterText,
  onFilterTextChange,
  onRefetchGames,
  onRefetchVideos,
  onRefetchLanguages,
  onRefetchCategories,
  exportData,
}) {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleOpenModal = (bool) => setIsModalOpened(bool);

  const addButton = () => {
    if (activeTab === "video") {
      return "New Video";
    }
    if (activeTab === "category") {
      return "New Category";
    }
    if (activeTab === "language") {
      return "New Language";
    }
    if (activeTab === "game") {
      return "New Game";
    }
    if (activeTab === "page") {
      return "New Component";
    }
    if (activeTab === "userList") {
      return "Export User List";
    }
    return null;
  };

  const addModal = () => {
    if (activeTab === "video") {
      return (
        <ModalVideo
          isOpened={isModalOpened}
          openModal={handleOpenModal}
          refetchData={onRefetchVideos}
        />
      );
    }
    if (activeTab === "category") {
      return (
        <ModalCategory
          isOpened={isModalOpened}
          openModal={handleOpenModal}
          refetchData={onRefetchCategories}
        />
      );
    }
    if (activeTab === "language") {
      return (
        <ModalLanguage
          isOpened={isModalOpened}
          openModal={handleOpenModal}
          refetchData={onRefetchLanguages}
        />
      );
    }
    if (activeTab === "game") {
      return (
        <ModalGame
          isOpened={isModalOpened}
          openModal={handleOpenModal}
          refetchData={onRefetchGames}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-4">
          <Searchbar
            className="relative w-full min-w-[200px]"
            filterText={filterText}
            onFilterTextChange={onFilterTextChange}
          />
        </div>
      </div>

      {activeTab !== "dashboard" && activeTab !== "fav" && (
        <div className="flex w-full justify-center space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
          {activeTab === "userList" ? (
            <Button
              type="button"
              customCSS="flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-center text-sm text-white hover:bg-primaryLight focus:outline-none gap-2"
              onClick={exportData}
            >
              <svg
                className="flex h-4 w-4 justify-end"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              {addButton()}
            </Button>
          ) : (
            <Button
              type="button"
              customCSS="flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-center text-sm text-white hover:bg-primaryLight focus:outline-none gap-2"
              onClick={() => setIsModalOpened(true)}
            >
              <svg
                className="flex h-4 w-4 justify-end"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              {addButton()}
            </Button>
          )}
          {addModal()}
        </div>
      )}
    </div>
  );
}

RowSearch.propTypes = {
  activeTab: PropTypes.string.isRequired,
  filterText: PropTypes.string,
  onFilterTextChange: PropTypes.func,
  onRefetchLanguages: PropTypes.func,
  onRefetchCategories: PropTypes.func,
  onRefetchGames: PropTypes.func,
  onRefetchVideos: PropTypes.func,
  exportData: PropTypes.func,
};

RowSearch.defaultProps = {
  filterText: null,
  onFilterTextChange: null,
  onRefetchGames: null,
  onRefetchVideos: null,
  onRefetchLanguages: null,
  onRefetchCategories: null,
  exportData: null,
};
