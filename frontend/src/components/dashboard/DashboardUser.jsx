import { useState, useMemo } from "react";

import Loader from "../common/Loader";
import Card from "../common/Card";
import TableFavorite from "./favorite/TableFavorite";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

import capitalizeText from "../../utils/capitalize";

import userStats from "../../data/userStats.json";

export default function DashboardUser() {
  const [filterText, setFilterText] = useState("");

  const [flagVideos, setFlagVideos] = useState(false);

  const { account } = useAuth();

  // retrieve data from database
  const { data: dbStats, isLoading: areStatsLoading } = useAxios(
    `/users/stats/${account.id_user}`,
    flagVideos
  );

  const stats = useMemo(
    () =>
      userStats.map((stat, index) => ({
        ...stat,
        ...dbStats[index],
      })),
    [dbStats]
  );

  const statsContent = useMemo(
    () =>
      stats.map((stat, index) => (
        <Card
          classCSS="min-w-[300px] bg-primary py-2 px-6 rounded-lg"
          key={stat.id}
        >
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex flex-col gap-1">
              <p>{stat.title}</p>
              {index === 0 ? (
                <p className="font-bold">{stat.favorite_count}</p>
              ) : (
                <p className="font-bold">
                  {capitalizeText(stat.plan || "None")}
                </p>
              )}
            </div>
            <img src={stat.logo} alt={stat.alt} className="h-[30px]" />
          </div>
        </Card>
      )),
    [stats]
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
      <TableFavorite
        filterText={filterText}
        onFilterTextChange={handleFilterText}
        flagVideos={flagVideos}
        setFlagVideos={setFlagVideos}
      />
    </article>
  );
}
