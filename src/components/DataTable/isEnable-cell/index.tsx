import { CircularProgress, IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "../../../hooks";
import { enableTemplate, getTemplateDetail } from "../../../slices/template";
import { Template } from "../../../models/template";

export const IsEnableCell = (props: GridRenderCellParams<Date>) => {
  const dispatch = useDispatch();
  const { isEnableTemplateLoading, templateDetail } = useSelector(
    (state) => state.template
  );
  const { value, row } = props;
  const rowValue = row as Template;
  const [selectedTemplate, setSelectedTemplate] = useState< number | undefined>()

  const createData = () => {
    const result = value as unknown as boolean;
    if (result) {
      return <LockOpenIcon className="fill-green-400" />;
    } else {
      return <LockIcon className="fill-red-400" />;
    }
  };

  const onEnableTemplate = useCallback(() => {
    setSelectedTemplate(rowValue.id)
    dispatch(
      enableTemplate({ id: rowValue.id, isEnable: !rowValue.isEnable })
    ).unwrap().then(() => setSelectedTemplate(undefined));
    
  }, [dispatch, rowValue.id, rowValue.isEnable]);

  return (
    <>
      {isEnableTemplateLoading && selectedTemplate === rowValue.id ? (
        <CircularProgress size={20} />
      ) : (
        <IconButton
          aria-label="lock"
          onClick={onEnableTemplate}
          size='small'
        >
          {createData()}
        </IconButton>
      )}
    </>
  );
};
