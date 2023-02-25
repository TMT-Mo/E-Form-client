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
import { useDispatch, useSelector } from "../../../hooks";
import { Document } from "../../../models/document";
import { lockDocument } from "../../../slices/document";
import { StatusDocument } from "../../../utils/constants";

const createData = (value: unknown) => {
  const result = value as boolean;
  console.log(result);
  // if(res)
  if (result) {
    return <LockIcon className="fill-red-400" />;
  } else {
    return <LockOpenIcon className="fill-green-400" />;
  }
};

export const renderLockDocumentCell = (
  params: GridRenderCellParams<number>
) => {
  const status = (params.row as Document).status;
  return (
    <>
      {status === StatusDocument.PROCESSING_DOCUMENT &&
        createData(params.value)}
    </>
  );
};

export const EditLockDocumentCell = (props: GridRenderEditCellParams) => {
  const dispatch = useDispatch();
  const { isLockDocumentLoading } = useSelector((state) => state.document);
  const { value, row, id, field } = props;
  const rowValue = row as Document;
  const [selectedDocument, setSelectedDocument] = useState<
    number | undefined
  >();
  const apiRef = useGridApiContext();
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: boolean | null
  ) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const onLockDocument = () => {
    setSelectedDocument(rowValue.id);
    dispatch(lockDocument({ id: rowValue.id, isLocked: !rowValue.isLocked }))
      .unwrap()
      .then(() => setSelectedDocument(undefined));
    handleChange(null, !rowValue.isLocked);
  };

  return (
    <>
      {isLockDocumentLoading && selectedDocument === rowValue.id ? (
        <CircularProgress size={20} />
      ) : (
        rowValue.status === StatusDocument.PROCESSING_DOCUMENT && (
          <IconButton aria-label="lock" onClick={onLockDocument} size="small">
            {createData(value)}
          </IconButton>
        )
      )}
    </>
  );
};

export const renderEditLockDocumentCell: GridColDef["renderCell"] = (
  params: any
) => {
  return <EditLockDocumentCell {...params} />;
};
