
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { StatusTemplate, StatusTemplateTag } from "../../../utils/constants";

const { NEW, APPROVED } = StatusTemplate;
const {NEW_TAG, APPROVED_TAG, REJECTED_TAG} = StatusTemplateTag
export const StatusCell = (props: GridRenderCellParams<Date>) => {
  const { value } = props;

  const createData = () => {
    switch (value as unknown as number) {
      case NEW:
        return <span className="w-full px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-xs border-blue-400 border border-solid">{NEW_TAG}</span>;
      case APPROVED:
        return <span className="w-full px-3 py-1 rounded-md bg-green-100 text-green-600 text-xs border-green-400 border border-solid">{APPROVED_TAG}</span>;
      default:
        return <span className="w-full px-3 py-1 rounded-md bg-red-100 text-red-600 text-xs border-red-400 border border-solid">{REJECTED_TAG}</span>
    }
  };

  return (
    <div className="flex w-full text-center">
      {createData()}
    </div>
  );
};
