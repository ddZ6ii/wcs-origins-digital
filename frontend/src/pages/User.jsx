// Packages
import PropTypes from "prop-types";

// Components
import DashboardUser from "../components/dashboard/DashboardUser";

export default function User({ dashboard }) {
  return (
    <>
      <p className="flex h-screen w-full items-center justify-center lg:hidden">
        Coming soon...
      </p>
      <div className="hidden lg:block">{dashboard && <DashboardUser />}</div>
    </>
  );
}

User.defaultProps = {
  dashboard: null,
};
User.propTypes = {
  dashboard: PropTypes.bool,
};
