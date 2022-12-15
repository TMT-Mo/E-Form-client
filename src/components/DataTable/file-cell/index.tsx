import {  IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import docIcon from '../../../assets/word.svg'
import pdfIcon from '../../../assets/pdf.svg'

export const FileCell = (props: GridRenderCellParams<Date>) => {
  const { value } = props;

  const createData = () => {
    if(value?.toString() === '.docx' || value?.toString() === '.doc'){
        return <img src={docIcon} alt=''/>
    }
    else{
        return <img src={pdfIcon} alt=''/>
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
