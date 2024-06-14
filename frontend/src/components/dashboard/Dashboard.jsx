import { useMemo, useState } from "react";
import { Pagination, ConfigProvider } from "antd";

import Card from "../common/Card";
import Loader from "../common/Loader";
import RowStatic from "./RowStatic";
import RowHead from "./RowHead";
import RowSearch from "./RowSearch";

import useAxios from "../../hooks/useAxios";

import isEmpty from "../../utils/isEmpty";
import { filterByText } from "../../utils/filterTable";
import paginationSettings from "../../settings/pagination.json";

import adminStats from "../../data/adminStats.json";

export default function Dashboard() {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // retrieve data from database
  const { data: videos, areVideosLoading } = useAxios("/videos");
  const { data: dbStats, areStatsLoading } = useAxios("/admin/stats");

  // table pagination
  const offset = pageSize * currentPage - pageSize;
  const nextPage = offset + pageSize;

  const stats = useMemo(
    () =>
      adminStats.map((stat, index) => ({
        ...stat,
        ...dbStats[index],
      })),
    [dbStats]
  );

  const statsContent = useMemo(
    () =>
      stats.map((stat) => (
        <Card classCSS="w-full bg-primary py-2 px-6 rounded-lg" key={stat.id}>
          <div className="flex flex-wrap justify-between gap-y-2">
            <div className="flex flex-col gap-1">
              <p>{stat.title}</p>
              <p className="font-bold">{stat.total}</p>
            </div>
            <img src={stat.logo} alt={stat.alt} className="w-[30px]" />
          </div>
        </Card>
      )),
    [stats]
  );

  const filteredVideos = useMemo(
    () => filterByText(videos, "title", filterText),
    [videos, filterText]
  );

  const videoContent = useMemo(
    () =>
      !areVideosLoading && !isEmpty(filteredVideos) ? (
        <>
          <table className="w-full text-left text-base text-neutralDarkest dark:text-neutralLightest">
            <RowHead activeTab="dashboard" />
            <tbody>
              {filteredVideos.slice(offset, nextPage).map((video) => (
                <RowStatic video={video} key={video.id} />
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
      ) : (
        <p className="my-4 text-center">No video found!</p>
      ),
    [filteredVideos, pageSize, currentPage]
  );

  const handleFilterText = (text) => setFilterText(text);

  return (
    <article className="flex w-screen max-w-[calc(100vw-320px)] flex-col gap-8 px-[100px] py-8">
      <h1>Dashboard</h1>

      <div className="flex flex-wrap gap-4 lg:flex-nowrap">
        {areStatsLoading ? (
          <Loader fullHeight={false} message="Loading stats..." />
        ) : (
          statsContent
        )}
      </div>

      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <RowSearch
          activeTab="dashboard"
          filterText={filterText}
          onFilterTextChange={handleFilterText}
        />
        <div className="overflow-x-auto">
          {areVideosLoading ? (
            <Loader fullHeight={false} message="Loading videos..." />
          ) : (
            videoContent
          )}
        </div>
      </div>
    </article>
  );
}
