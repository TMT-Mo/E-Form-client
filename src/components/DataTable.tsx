import React, { useCallback, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { getQuestionList } from "../slices/question";
import { useDispatch, useSelector } from "../hooks";
import { handleSuccess, handleError } from "../slices/notification";
import { HeaderTable, HeaderTableId, ResponseStatus } from "../utils/constants";
import { LinearProgress } from "@mui/material";

interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id_question: number;
}

const {ID_QUESTION, QUESTION, STATUS_QUESTION} = HeaderTableId
const {ID: id, QUESTION: question, STATUS_QUESTION: statusQuestion } = HeaderTable

const columns: GridColDef[] = [
  { field: ID_QUESTION, headerName: id, flex: 0.5, hide: true },
  {
    field: QUESTION,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>
        {question}
        <span role="img" aria-label="enjoy">
          🎂
        </span>
      </strong>
    ),
  },
  { field: STATUS_QUESTION, headerName: statusQuestion, flex: 1 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    hideable: false,
    flex: 1,
    filterable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { getQuestionLoading, questionList } = useSelector(
    (state) => state.question
  );

  const request = useCallback(async () => {
    try {
      await dispatch(getQuestionList()).unwrap(); //* Unwrap to catch error when failed
      dispatch(handleSuccess({ message: "successful" }));
    } catch {
      dispatch(handleError({ message: "failed" }));
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
