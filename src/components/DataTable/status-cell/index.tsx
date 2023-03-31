import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { StatusDocument, StatusTemplate } from "utils/constants";
import StatusTag from "components/StatusTag";

export const StatusCell = (props: GridRenderCellParams<Date>) => {
  const { value, row } = props;

  return (
    <div className="flex text-center">
      <StatusTag
        status={value as unknown as StatusTemplate | StatusDocument}
        type={row.xfdfString ? "document" : "template"}
      />
    </div>
  );
};
