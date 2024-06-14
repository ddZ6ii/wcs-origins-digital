import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Pagination, ConfigProvider } from "antd";

import Loader from "../../common/Loader";
import RowSearch from "../RowSearch";
import RowHead from "../RowHead";
import RowFavorite from "./RowFavorite";

import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

import isEmpty from "../../../utils/isEmpty";
import { filterByText } from "../../../utils/filterTable";

import paginationSettings from "../../../settings/pagination.json";

export default function TableFavorite({
  filterText,
  onFilterTextChange,
  flagVideos,
  setFlagVideos,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { account } = useAuth();

  // retrieve data from database
  const { data: favoriteVideos, isLoading: areFavLoading } = useAxios(
    `/user-video/${account.id_user}`,
    flagVideos
  );

  // table pagination
  const offset = pageSize * currentPage - pageSize;
  const nextPage = offset + pageSize;

  const filteredFavVideos = useMemo(
    () => filterByText(favoriteVideos, "title", filterText),
    [favoriteVideos, filterText]
  );

  const favContent = useMemo(
    () => (
      <>
        <RowSearch
          activeTab="fav"
          filterText={filterText}
          onFilterTextChange={onFilterTextChange}
        />

        {!areFavLoading && !isEmpty(filteredFavVideos) ? (
          <>
            <table className="w-full overflow-x-auto text-left text-base text-neutralDarkest dark:text-neutralLightest">
              <RowHead activeTab="fav" />
              <tbody>
                {filteredFavVideos.slice(offset, nextPage).map((video) => (
                  <RowFavorite
                    key={video.id}
                    video={video}
                    userId={account.id_user}
                    setFlagVideos={setFlagVideos}
                  />
                ))}
              </tbody>
            </table>
            <ConfigProvider theme={paginationSettings}>
              <Pagination
                pageSizeOptions={[5, 10, 20, 50, 100]}
                className="py-2 text-center"
                pageSize={pageSize}
                current={currentPage}
                total={filteredFavVideos.length}
                onChange={(pageClicked, onPageSize) => {
                  setCurrentPage(pageClicked);
                  setPageSize(onPageSize);
                }}
                showSizeChanger
              />
            </ConfigProvider>
          </>
        ) : (
          <p className="my-4 text-center">No favorite video!</p>
        )}
      </>
    ),
    [filteredFavVideos, pageSize, currentPage]
  );

  return (
    <div className="flex max-w-full flex-col gap-2">
      <h2 className="text-lg font-bold">Favorites Videos</h2>
      <div className="overflow-hidden bg-gray-800 shadow-md sm:rounded-lg">
        {areFavLoading ? (
          <Loader fullHeight={false} message="Loading favs..." />
        ) : (
          favContent
        )}
      </div>
    </div>
  );
}

TableFavorite.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  setFlagVideos: PropTypes.func.isRequired,
  flagVideos: PropTypes.bool,
};

TableFavorite.defaultProps = {
  flagVideos: null,
};
