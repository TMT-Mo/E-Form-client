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
        {"Birthday "}
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

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

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
        // checkboxSelection
      />
    </div>
  );
};

export default DataTable;
