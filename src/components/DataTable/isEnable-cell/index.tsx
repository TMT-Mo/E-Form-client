import { IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export const IsEnableCell = (props: GridRenderCellParams<Date>) => {
  const { value } = props;

  const createData = () => {
    const result = value as unknown as boolean;
    if (result) {
      return <LockOpenIcon className="fill-green-400" />;
    } else {
      return <LockIcon className="fill-red-400" />;
    }
  };

  return (
    <div>
      <IconButton aria-label="lock">{createData()}</IconButton>
    </div>
  );
};
