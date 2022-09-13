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
import { ResponseStatus } from "../utils/constants";
import { LinearProgress } from "@mui/material";

interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id_question: number;
}

const columns: GridColDef[] = [
  { field: "id_question", headerName: "ID", flex: 0.5, hide: true },
  {
    field: "question",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>
        {"Birthday ZXXZXz"}
        <span role="img" aria-label="enjoy">
          🎂
        </span>
      </strong>
    ),
  },
  { field: "status_question", headerName: "Last name", flex: 1 },
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

  const request = useCallback(async (): Promise<void> => {
    await dispatch(getQuestionList()).then((response) => {
      if (response.meta.requestStatus === ResponseStatus.FULFILLED) {
        dispatch(handleSuccess({ message: "successful" }));
      } else {
        dispatch(handleError({ message: "failed" }));
      }
    });
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
