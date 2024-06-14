import { useState, useEffect, useMemo } from "react";
import { Pagination, ConfigProvider } from "antd";
import { toast } from "react-toastify";

import Loader from "../../common/Loader";
import RowUser from "./RowUser";
import RowHead from "../RowHead";
import RowSearch from "../RowSearch";

import useAxios from "../../../hooks/useAxios";

import TOAST_DEFAULT_CONFIG from "../../../settings/toastify.json";
import paginationSettings from "../../../settings/pagination.json";
import isEmpty from "../../../utils/isEmpty";
import { filterByText } from "../../../utils/filterTable";

// export to CSV
const convertToCSV = (data) => {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((item) => Object.values(item).join(","));
  return [header, ...rows].join("\n");
};
const exportToCSV = (data) => {
  const csvContent = `data:text/csv;charset=utf-8,${convertToCSV(data)}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "userdata.csv");
  document.body.appendChild(link);
  link.click();
};

export default function UserTable() {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: users, isLoading } = useAxios("/users");

  // table pagination
  const offset = pageSize * currentPage - pageSize;
  const nextPage = offset + pageSize;

  const filteredUsers = useMemo(
    () => filterByText(users, "pseudo", filterText),
    [users, filterText]
  );

  const userContent = useMemo(
    () =>
      !isLoading && !isEmpty(filteredUsers) ? (
        <>
          <table className="w-full text-left text-base text-neutralLightest">
            <RowHead activeTab="userList" />
            <tbody>
              {filteredUsers.slice(offset, nextPage).map((user) => (
                <RowUser key={user.id_user} user={user} />
              ))}
            </tbody>
          </table>
          <ConfigProvider theme={paginationSettings}>
            <Pagination
              pageSizeOptions={[5, 10, 20, 50, 100]}
              className="py-2 text-center"
              pageSize={pageSize}
              current={currentPage}
              total={filteredUsers.length}
              onChange={(pageClicked, onPageSize) => {
                setCurrentPage(pageClicked);
                setPageSize(onPageSize);
              }}
              showSizeChanger
            />
          </ConfigProvider>
        </>
      ) : (
        <p className="my-4 text-center">No user found!</p>
      ),
    [filteredUsers, pageSize, currentPage]
  );

  const handleFilterText = (text) => setFilterText(text);

  const handleExport = () => {
    exportToCSV(users);
    toast.success("User list successfully exported!", TOAST_DEFAULT_CONFIG);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <article className="flex w-screen max-w-[calc(100vw-320px)] flex-col gap-8 px-[100px] py-8">
      <h1>Users</h1>

      <div className="relative overflow-hidden bg-gray-800 shadow-md sm:rounded-lg">
        <RowSearch
          activeTab="userList"
          filterText={filterText}
          onFilterTextChange={handleFilterText}
          exportData={handleExport}
        />

        <div className="overflow-x-auto">
          {isLoading ? <Loader fullHeight={false} /> : userContent}
        </div>
      </div>
    </article>
  );
}
