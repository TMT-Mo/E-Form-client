import React, { useCallback, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import { handleSuccess, handleError } from "../../../slices/notification";
import { getQuestionList } from "../../../slices/question";
import { TemplateHeaderTable, HeaderTable } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../hooks";

interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id_question: number;
}

const {FILE, ACTION, DEPARTMENT, DESCRIPTION, NAME, STATUS, TYPE} = TemplateHeaderTable
const {ID: id, QUESTION: question, STATUS_QUESTION: statusQuestion } = HeaderTable

const columns: GridColDef[] = [
  { field: FILE, headerName: FILE, flex: 0.5 },
  {
    field: NAME,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
  },
  { field: DESCRIPTION, headerName: DESCRIPTION, flex: 1 },
  {
    field: TYPE,
    headerName: "Age",
    type: "number",
    flex: 1,
  },
  {
    field: DEPARTMENT,
    headerName: DEPARTMENT,
    sortable: false,
    hideable: false,
    flex: 1,
    filterable: false,
  },
  {
    field: STATUS,
    headerName: STATUS,
    sortable: false,
    hideable: false,
    flex: 1,
    filterable: false,
  },
  {
    field: ACTION,
    headerName: ACTION,
    sortable: false,
    hideable: false,
    flex: 1,
    filterable: false,
  },
];

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const {getQuestionLoading,questionList} = useSelector(state => state.question)
  const request = useCallback(async () => {
    try {
      await dispatch(getQuestionList()).unwrap(); //* Unwrap to catch error when failed
      dispatch(handleSuccess({ message: "successful" }));
    } catch {
      dispatch(handleError({ errorMessage: undefined }));
    }
  }, [dispatch]);

  useEffect(() => {
    request();
  }, [request]);

  const getRowId = (params: GetRowIdParams) => {
    return params.id_question;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={questionList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={getQuestionLoading}
        getRowId={getRowId}
        // components={{ LoadingOverlay: () => <LinearProgress /> }}
      ></DataGrid>
    </div>
  );
};

export default DataTable;
