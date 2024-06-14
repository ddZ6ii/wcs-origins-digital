import PropTypes from "prop-types";

import ManageContent from "../components/dashboard/ManageContent";
import Dashboard from "../components/dashboard/Dashboard";
import UserTable from "../components/dashboard/user/UserTable";

export default function Admin({ edit, dashboard, userList }) {
  return (
    <>
      <p className="flex h-screen w-full items-center justify-center lg:hidden">
        Coming soon...
      </p>
      <div className="hidden lg:block">
        {edit && <ManageContent />}
        {dashboard && <Dashboard />}
        {userList && <UserTable />}
      </div>
    </>
  );
}

Admin.defaultProps = {
  edit: null,
  dashboard: null,
  userList: null,
};
Admin.propTypes = {
  edit: PropTypes.bool,
  dashboard: PropTypes.bool,
  userList: PropTypes.bool,
};
