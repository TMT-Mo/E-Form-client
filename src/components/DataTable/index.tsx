import React, { useCallback, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";
import { handleError, handleSuccess } from "../../slices/notification";
import { useDispatch, useSelector } from "../../hooks";
import { getQuestionList } from "../../slices/question";
import { LocationIndex } from "../../utils/constants";
import { awaitSigningColumns, historyColumns, personalDocColumns, sharedDocColumns, templateColumns } from "../../utils/mui-data";
import { Template, TemplateListResponse } from "../../models/templates";
import { AwaitSigningResponse, HistoryResponse, PersonalDocResponse } from "../../models/documents";
import { QuestionResponse } from "../../models/questions";
import { getTemplates } from "../../slices/template";

interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id: number
}

interface Data{
  columns?: GridColDef[],
  loading?: boolean,
  table: Template[] | PersonalDocResponse | AwaitSigningResponse | HistoryResponse | QuestionResponse
}

const {
  TEMPLATE,
  ACCOUNT,
  AWAITSIGNING,
  DEPARTMENT,
  HISTORY,
  PERSONAL,
  POSITION,
  SHARED,
} = LocationIndex;

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const {  questionList } = useSelector(
    (state) => state.question
  );
  const { locationIndex } = useSelector((state) => state.location);
  const {isGetTemplatesLoading, templateList } = useSelector(state => state.template)

  const data = ():Data => {
    switch (locationIndex) {
      case DEPARTMENT:
        return {columns: templateColumns, loading: false, table: questionList};
      case POSITION:
        return {columns: templateColumns, loading: false, table: questionList};
      case ACCOUNT:
        return {columns: templateColumns, loading: false, table: questionList};
      case TEMPLATE:
        return {columns: templateColumns, loading: isGetTemplatesLoading, table: templateList };
      case AWAITSIGNING:
        return {columns: awaitSigningColumns, loading: false, table: questionList};
      case PERSONAL:
        return {columns: personalDocColumns, loading: false, table: questionList};
      case SHARED:
        return {columns: sharedDocColumns, loading: false, table: questionList};
      default:
        return {columns: historyColumns, loading: false, table: questionList};
    }
  };
  const request = useCallback(async () => {
    try {
      await dispatch(getTemplates()).unwrap(); //* Unwrap to catch error when failed
      dispatch(handleSuccess({ message: "successful" }));
    } catch {
      dispatch(handleError({ errorMessage: undefined }));
    }
  }, [dispatch]);

  useEffect(() => {
    request();
  }, [request]);

  const getRowId = (params: GetRowIdParams) => {
    return params.id;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={templateList}
        columns={data().columns!}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={data().loading}
        getRowId={getRowId}
        // components={{ LoadingOverlay: () => <LinearProgress /> }}
      ></DataGrid>
    </div>
  );
};

export default DataTable;
