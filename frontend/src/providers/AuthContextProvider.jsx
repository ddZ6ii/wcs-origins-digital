import PropTypes from "prop-types";
import AuthContext from "../contexts/AuthContext";
import authStore from "../store/authStore";

export default function AuthContextProvider({ children }) {
  return (
    <AuthContext.Provider value={authStore()}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AuthContextProvider.defaultProps = {
  children: null,
};
