import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Pagination, ConfigProvider } from "antd";

import Loader from "../../common/Loader";
import RowHead from "../RowHead";
import RowVideo from "./RowVideo";

import useAxios from "../../../hooks/useAxios";

import isEmpty from "../../../utils/isEmpty";
import { filterByText } from "../../../utils/filterTable";
import paginationSettings from "../../../settings/pagination.json";

export default function TableVideos({ filterText, refetchFlag, onRefetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // retrieve data from database
  const { data: videos, isLoading } = useAxios("/videos", refetchFlag);

  // table pagination
  const offset = pageSize * currentPage - pageSize;
  const nextPage = offset + pageSize;

  const filteredVideos = useMemo(
    () => filterByText(videos, "title", filterText),
    [videos, filterText]
  );

  if (isLoading) return <Loader fullHeight={false} />;

  if (!isLoading && isEmpty(filteredVideos))
    return <p className="my-4 text-center">No video found!</p>;

  return (
    <>
      <table className="w-full overflow-x-auto text-left text-base text-neutralLightest">
        <RowHead activeTab="video" />
        <tbody>
          {filteredVideos.slice(offset, nextPage).map((video) => (
            <RowVideo key={video.id} video={video} refetchData={onRefetch} />
          ))}
        </tbody>
      </table>

      <ConfigProvider theme={paginationSettings}>
        <Pagination
          pageSizeOptions={[5, 10, 20, 50, 100]}
          className="py-2 text-center"
          pageSize={pageSize}
          current={currentPage}
          total={filteredVideos.length}
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

TableVideos.propTypes = {
  filterText: PropTypes.string.isRequired,
  refetchFlag: PropTypes.bool.isRequired,
  onRefetch: PropTypes.func.isRequired,
};
