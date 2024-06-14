import { useState } from "react";

// Components
import RowSearch from "./RowSearch";
import NavTab from "./NavTab";
import TableVideos from "./video/TableVideos";
import TableCategories from "./category/TableCategories";
import TableLanguages from "./language/TableLanguages";
import TableGames from "./game/TableGames";

export default function ManageContent() {
  const [activeTab, setActiveTab] = useState("video");
  const [filterText, setFilterText] = useState("");

  const [refetchGames, setRefetchGames] = useState(false);
  const [refetchVideos, setRefetchVideos] = useState(false);
  const [refetchLanguages, setRefetchLanguages] = useState(false);
  const [refetchCategories, setRefetchCategories] = useState(false);

  const handleActiveTab = (tab) => setActiveTab(tab);
  const handleFilterText = (text) => setFilterText(text);
  const handleRefetchGames = (bool) => setRefetchGames(bool);
  const handleRefetchVideos = (bool) => setRefetchVideos(bool);
  const handleRefetchLanguages = (bool) => setRefetchLanguages(bool);
  const handleRefetchCategories = (bool) => setRefetchCategories(bool);

  return (
    <div className="flex w-screen max-w-[calc(100vw-320px)] flex-col gap-8 px-[100px] py-8">
      <h1>Manage Content</h1>

      <div className="relative min-w-[600px] overflow-hidden bg-gray-800 shadow-md sm:rounded-lg">
        <NavTab setActiveTabItem={handleActiveTab} />

        <RowSearch
          activeTab={activeTab}
          filterText={filterText}
          onFilterTextChange={handleFilterText}
          onRefetchGames={handleRefetchGames}
          onRefetchVideos={handleRefetchVideos}
          onRefetchLanguages={handleRefetchLanguages}
          onRefetchCategories={handleRefetchCategories}
        />

        {activeTab === "video" && (
          <TableVideos
            filterText={filterText}
            refetchFlag={refetchVideos}
            onRefetch={handleRefetchVideos}
          />
        )}

        {activeTab === "category" && (
          <TableCategories
            filterText={filterText}
            refetchFlag={refetchCategories}
            onRefetch={handleRefetchCategories}
          />
        )}

        {activeTab === "language" && (
          <TableLanguages
            filterText={filterText}
            refetchFlag={refetchLanguages}
            onRefetch={handleRefetchLanguages}
          />
        )}

        {activeTab === "game" && (
          <TableGames
            filterText={filterText}
            refetchFlag={refetchGames}
            onRefetch={handleRefetchGames}
          />
        )}
      </div>
    </div>
  );
}
