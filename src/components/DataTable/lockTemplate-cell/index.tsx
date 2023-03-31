import { CircularProgress, IconButton } from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "hooks";
import { enableTemplate } from "slices/template";
import { Template } from "models/template";

const createData = (value: unknown) => {
  const result = value as boolean;
  if (result) {
    return <LockOpenIcon className="fill-green-400" />;
  } else {
    return <LockIcon className="fill-red-400" />;
  }
};

export const renderLockTemplateCell = (params: GridRenderCellParams<number>) => {
  return <>{createData(params.value)}</>;
};

export const EditLockTemplateCell = (props: GridRenderEditCellParams) => {
  const dispatch = useDispatch();
  const { isEnableTemplateLoading } = useSelector(
    (state) => state.template
  );
  const { value, row, id, field } = props;
  const rowValue = row as Template;
  const [selectedTemplate, setSelectedTemplate] = useState<
    number | undefined
  >();
  const apiRef = useGridApiContext();
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: boolean | null
  ) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const onLockTemplate = () => {
    setSelectedTemplate(rowValue.id);
    dispatch(enableTemplate({ id: rowValue.id, isEnable: !rowValue.isEnable }))
      .unwrap()
      .then(() => setSelectedTemplate(undefined));
    handleChange(null,!rowValue.isEnable);
  };

  return (
    <>
      {isEnableTemplateLoading && selectedTemplate === rowValue.id ? (
        <CircularProgress size={20} />
      ) : (
        <IconButton aria-label="lock" onClick={onLockTemplate} size="small">
          {createData(value)}
        </IconButton>
      )}
    </>
  );
};

export const renderEditLockTemplateCell: GridColDef["renderCell"] = (params: any) => {
  return <EditLockTemplateCell {...params} />;
};
