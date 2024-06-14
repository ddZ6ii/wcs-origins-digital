import PropTypes from "prop-types";

import Filter from "./Filter";
import Label from "../common/Label";
import Searchbar from "../common/Searchbar";

import useAxios from "../../hooks/useAxios";

import stylesSearch from "../dashboard/Table.module.css";

export default function Filters({
  filterText,
  onChangeFilterText,
  onChangeCategory,
  onResetCategory,
  onChangeGame,
  onResetGame,
}) {
  const { data: games } = useAxios("/games");
  const { data: categories } = useAxios("/categories");

  const filters = [
    {
      id: 1,
      name: "category",
      inputType: "checkbox",
      data: categories,
      onChange: onChangeCategory,
      onResetCat: onResetCategory,
    },
    {
      id: 2,
      name: "game",
      inputType: "radio",
      data: games,
      onChange: onChangeGame,
      onResetGame,
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 px-6 pt-12 md:flex-nowrap md:px-0">
      {filters.map((filter) => (
        <Filter
          key={filter.id}
          data={filter.data}
          name={filter.name}
          inputType={filter.inputType}
          onChange={filter.onChange}
          onResetCat={filter.onResetCat}
          onResetGame={filter.onResetGame}
        />
      ))}

      <div className="flex w-full flex-col gap-1.5">
        <Label
          htmlFor="search"
          title="Search for a video"
          className={`${stylesSearch.label__style}`}
        />
        <Searchbar
          className="relative"
          filterText={filterText}
          onFilterTextChange={onChangeFilterText}
        />
      </div>
    </div>
  );
}

Filters.propTypes = {
  filterText: PropTypes.string.isRequired,
  onChangeFilterText: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  onResetCategory: PropTypes.func.isRequired,
  onChangeGame: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired,
};
