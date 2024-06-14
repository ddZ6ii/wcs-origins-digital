import PropTypes from "prop-types";

import passHide from "../../assets/icon/utility/eyeSlash.svg";
import passShow from "../../assets/icon/dashboard/watch.svg";

export default function InputPassword({
  type,
  name,
  placeholder,
  value,
  isVisible,
  onInputChange,
  onButtonClick,
}) {
  return (
    <div className="relative flex w-full items-center">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className=" w-full rounded border-none bg-neutralLight p-3 outline-none dark:bg-neutralLightest"
        value={value}
        onChange={onInputChange}
        pattern="[\w]{4,12}"
        required
        title="4 to 12 characters"
      />
      <button
        type="button"
        className="absolute right-3 flex w-5"
        onClick={onButtonClick}
      >
        <img src={isVisible ? passHide : passShow} alt="show password icon" />
      </button>
    </div>
  );
}

InputPassword.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isVisible: PropTypes.bool,
  onInputChange: PropTypes.func,
  onButtonClick: PropTypes.func,
};

InputPassword.defaultProps = {
  type: "password",
  name: "",
  placeholder: "...",
  value: "",
  isVisible: false,
  onInputChange: () => null,
  onButtonClick: () => null,
};