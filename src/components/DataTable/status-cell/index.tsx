
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { StatusDocument, StatusTemplate } from "../../../utils/constants";
import StatusTag from "../../StatusTag";

export const StatusCell = (props: GridRenderCellParams<Date>) => {
  const { value, row } = props;

  return (
    <div className="flex w-full text-center">
      <StatusTag status={value as unknown as StatusTemplate | StatusDocument} type={row.xfdfString ? 'document' : 'template'} />
    </div>
  );
};
