
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
        return <span>{NEW_TAG}</span>;
      case APPROVED:
        return <span>{APPROVED_TAG}</span>;
      default:
        return <span>{REJECTED_TAG}</span>
    }
  };

  return (
    <div>
      {createData()}
    </div>
  );
};
