import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "./Button";
import DropdownList from "./DropdownList";
import Loader from "./Loader";
import Searchbar from "./Searchbar";

import getSelectionName from "../../utils/getSelectionName";

export default function Dropdown({
  name = "",
  type,
  title,
  items,
  initialValue = "",
  handleChange,
  resetCatFilters,
  resetGameFilters,
  resetLangFilters,
}) {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState("");
  const [selectedItems, setSelectedItems] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useLocation();

  const updateSelectedItems = (selectionId) => {
    const clonedSelection = [...selectedItems];
    const updatedSelection = clonedSelection.map((item) => {
      if (type === "checkbox") {
        return {
          ...item,
          isSelected:
            item.id === selectionId ? !item.isSelected : item.isSelected,
        };
      }
      return {
        ...item,
        isSelected: item.id === selectionId ? !item.isSelected : false,
      };
    });
    setSelectedItems(updatedSelection);
    // close dropdown
    if (type !== "checkbox") setIsOpened(false);
  };

  const initState = (data, initialState) => {
    const state = [];
    items.forEach((item) =>
      state.push({
        id: item.id,
        name: item.name,
        isSelected: initialState.includes(item.name),
      })
    );
    return state;
  };

  const resetDropdown = () => {
    setSelectedItems(initState(items, initialValue));
    if (name === "category") resetCatFilters();
    if (name === "game") resetGameFilters();
    if (name === "language") resetLangFilters();
  };

  useEffect(() => {
    if (navigate.pathname === "/videos" && searchParams.get("game") !== null) {
      setSelectedItems(initState(items, searchParams.get("game")));
      setIsLoading(false);
    } else if (initialValue || initialValue === "") {
      setSelectedItems(initState(items, initialValue));
      setIsLoading(false);
    }
  }, [initialValue]);

  if (isLoading) return <Loader fullHeight={false} />;

  return (
    <>
      <Button
        customCSS="flex items-center justify-between rounded-lg bg-primary p-3 text-center text-sm text-neutralLight focus:outline-none hover:bg-primaryLight min-w-[200px]"
        type="button"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {getSelectionName(selectedItems) || title}
        <svg
          className={`flex h-4 w-4 justify-end ${isOpened ? "rotate-180" : ""}`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpened && (
        <div className="w-50 absolute top-full z-10 mt-2 rounded-lg bg-gray-700 shadow">
          <Searchbar
            className="relative w-full p-3"
            filterText={filterOptions}
            onFilterTextChange={setFilterOptions}
          />
          <DropdownList
            items={items}
            inputName={name}
            inputType={type}
            filterOptions={filterOptions}
            selection={selectedItems}
            onSelectionChange={updateSelectedItems}
            handleChange={handleChange}
          />
          <Button
            customCSS="bg-primaryLight text-neutralLightest hover:bg-primaryLightest rounded py-1 px-3 m-3"
            onClick={resetDropdown}
          >
            Reset
          </Button>
        </div>
      )}
    </>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  handleChange: PropTypes.func.isRequired,
  resetCatFilters: PropTypes.func,
  resetGameFilters: PropTypes.func,
  resetLangFilters: PropTypes.func,
};

Dropdown.defaultProps = {
  name: null,
  items: null,
  initialValue: "",
  resetCatFilters: null,
  resetGameFilters: null,
  resetLangFilters: null,
};
