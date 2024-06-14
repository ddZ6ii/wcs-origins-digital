import PropTypes from "prop-types";

import Label from "../common/Label";
import Dropdown from "../common/Dropdown";

import stylesSearch from "../dashboard/Table.module.css";

export default function Filter({
  data,
  name,
  inputType,
  onChange,
  onResetCat,
  onResetGame,
}) {
  return (
    <div className="relative flex flex-col gap-1.5">
      <Label
        htmlFor={name}
        title={`Filter by ${name}`}
        className={`${stylesSearch.label__style}`}
      />
      {data.length && (
        <Dropdown
          type={inputType}
          name={name}
          title={`Select a ${name}`}
          items={data}
          handleChange={onChange}
          resetCatFilters={onResetCat}
          resetGameFilters={onResetGame}
        />
      )}
    </div>
  );
}

Filter.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        thumbnail: PropTypes.string,
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  ]).isRequired,
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onResetCat: PropTypes.func,
  onResetGame: PropTypes.func,
};

Filter.defaultProps = {
  onResetCat: null,
  onResetGame: null,
};
