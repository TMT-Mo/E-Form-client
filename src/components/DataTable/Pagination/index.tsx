import { Pagination } from "@mui/material";
import React from "react";

interface State {
  totalPages: number,
  currentPage: number,
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void
}

const CustomPagination: React.FC<State> = ({totalPages, currentPage, onChangePage}) => {

  return (
    <Pagination
      count={totalPages}
      page={currentPage! + 1}
      color="primary"
      shape="rounded"
      className="flex bg-white justify-center py-2"
      onChange={onChangePage}
    />
  );
};

export default CustomPagination;
