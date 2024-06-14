import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Pagination, ConfigProvider } from "antd";

import Loader from "../../common/Loader";
import RowHead from "../RowHead";
import RowGame from "./RowGame";

import useAxios from "../../../hooks/useAxios";

import isEmpty from "../../../utils/isEmpty";
import { filterByText } from "../../../utils/filterTable";
import paginationSettings from "../../../settings/pagination.json";

export default function TableGames({ filterText, refetchFlag, onRefetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // retrieve data from database
  const { data: games, isLoading } = useAxios("/games", refetchFlag);

  // table pagination
  const offset = pageSize * currentPage - pageSize;
  const nextPage = offset + pageSize;

  const filteredGames = useMemo(
    () => filterByText(games, "name", filterText),
    [games, filterText]
  );

  if (isLoading) return <Loader fullHeight={false} />;

  if (!isLoading && isEmpty(filteredGames))
    return <p className="my-4 text-center">No game found!</p>;

  return (
    <>
      <table className="w-full overflow-x-auto text-left text-base text-neutralLightest">
        <RowHead activeTab="game" />
        <tbody>
          {filteredGames.slice(offset, nextPage).map((game) => (
            <RowGame key={game.id} game={game} refetchData={onRefetch} />
          ))}
        </tbody>
      </table>

      <ConfigProvider theme={paginationSettings}>
        <Pagination
          pageSizeOptions={[5, 10, 20, 50, 100]}
          className="py-2 text-center"
          pageSize={pageSize}
          current={currentPage}
          total={filteredGames.length}
          onChange={(pageClicked, onPageSize) => {
            setCurrentPage(pageClicked);
            setPageSize(onPageSize);
          }}
          showSizeChanger
        />
      </ConfigProvider>
    </>
  );
}

TableGames.propTypes = {
  filterText: PropTypes.string.isRequired,
  refetchFlag: PropTypes.bool.isRequired,
  onRefetch: PropTypes.func.isRequired,
};
