import {  IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const IsDisabledCell = (props: GridRenderCellParams<Date>) => {
  const {  value } = props;

  const createData = () => {
    if(value?.toString() === '.docx' || value?.toString() === '.doc'){
        return <LockIcon className="fill-red-400"/>
    }
    else{
        return <LockOpenIcon className="fill-green-400"/>
    }
  }

  return (
    <div>
      <IconButton aria-label="lock" >
        {createData()}
      </IconButton>
    </div>
  );
};
