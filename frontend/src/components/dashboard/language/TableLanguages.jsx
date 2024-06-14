import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Pagination, ConfigProvider } from "antd";

import Loader from "../../common/Loader";
import RowHead from "../RowHead";
import RowLanguage from "./RowLanguage";

import useAxios from "../../../hooks/useAxios";

import isEmpty from "../../../utils/isEmpty";
import { filterByText } from "../../../utils/filterTable";
import paginationSettings from "../../../settings/pagination.json";

export default function TableLanguages({ filterText, refetchFlag, onRefetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // retrieve data from database
  const { data: languages, isLoading } = useAxios("/languages", refetchFlag);

  // table pagination
  const offset = pageSize * currentPage - pageSize;
  const nextPage = offset + pageSize;

  const filteredLanguages = useMemo(
    () => filterByText(languages, "name", filterText),
    [languages, filterText]
  );

  if (isLoading) return <Loader fullHeight={false} />;

  if (!isLoading && isEmpty(filteredLanguages))
    return <p className="my-4 text-center">No language found!</p>;

  return (
    <>
      <table className="w-full overflow-x-auto text-left text-base text-neutralLightest">
        <RowHead activeTab="language" />
        <tbody>
          {filteredLanguages.slice(offset, nextPage).map((language) => (
            <RowLanguage
              key={language.id}
              language={language}
              refetchData={onRefetch}
            />
          ))}
        </tbody>
      </table>

      <ConfigProvider theme={paginationSettings}>
        <Pagination
          pageSizeOptions={[5, 10, 20, 50, 100]}
          className="py-2 text-center"
          pageSize={pageSize}
          current={currentPage}
          total={filteredLanguages.length}
          onChange={(pageClicked, onPageSize) => {
            setCurrentPage(pageClicked);
            setPageSize(onPageSize);
          }}
          showSizeChanger
        />
      </ConfigProvider>
    </>
  );
}

TableLanguages.propTypes = {
  filterText: PropTypes.string.isRequired,
  refetchFlag: PropTypes.bool.isRequired,
  onRefetch: PropTypes.func.isRequired,
};
