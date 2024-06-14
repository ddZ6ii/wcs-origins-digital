import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Pagination, ConfigProvider } from "antd";

import RowHead from "../RowHead";
import RowCategory from "./RowCategory";
import Loader from "../../common/Loader";

import useAxios from "../../../hooks/useAxios";

import isEmpty from "../../../utils/isEmpty";
import { filterByText } from "../../../utils/filterTable";
import paginationSettings from "../../../settings/pagination.json";

export default function TableCategories({
  filterText,
  refetchFlag,
  onRefetch,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // retrieve data from database
  const { data: categories, isLoading } = useAxios("/categories", refetchFlag);

  // table pagination
  const offset = pageSize * currentPage - pageSize;
  const nextPage = offset + pageSize;

  const filteredCategories = useMemo(
    () => filterByText(categories, "name", filterText),
    [categories, filterText]
  );

  if (isLoading) return <Loader fullHeight={false} />;

  if (!isLoading && isEmpty(filteredCategories))
    return <p className="my-4 text-center">No category found!</p>;

  return (
    <>
      <table className="w-full overflow-x-auto text-left text-base text-neutralLightest">
        <RowHead activeTab="category" />
        <tbody>
          {filteredCategories.slice(offset, nextPage).map((category) => (
            <RowCategory
              key={category.id}
              category={category}
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
          total={filteredCategories.length}
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

TableCategories.propTypes = {
  filterText: PropTypes.string.isRequired,
  refetchFlag: PropTypes.bool.isRequired,
  onRefetch: PropTypes.func.isRequired,
};
