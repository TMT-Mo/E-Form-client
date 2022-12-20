import React from "react";
import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "../../hooks";
import { LocationIndex } from "../../utils/constants";
import {
  awaitSigningColumns,
  historyColumns,
  newTemplatesColumns,
  personalDocColumns,
  sharedDocColumns,
  templateColumns,
  templateHistoryColumns,
} from "../../utils/mui-data";
import { Template } from "../../models/template";
import { onChangeTemplatePage, setTemplateFilter, setTemplateSorter } from "../../slices/template";
import CustomPagination from "./pagination";

interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id: number;
}

interface Data {
  columns?: GridColDef[];
  loading?: boolean;
  table: Template[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const {
  SYSTEM,
  ACCOUNT,
  NEW_TEMPLATE,
  TEMPLATE,
  TEMPLATE_HISTORY,
  AWAIT_SIGNING,
  PERSONAL,
  SHARED,
  DOCUMENT_HISTORY
} = LocationIndex;

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { locationIndex } = useSelector((state) => state.location);
  const {
    isGetTemplatesLoading,
    templateList,
    total,
    currentPage,
  } = useSelector((state) => state.template);

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    // Here you save the data you need from the filter model
    const {value, columnField} = filterModel.items[0]
    if(!value){
      dispatch(setTemplateFilter(undefined));
      return
    }
    dispatch(setTemplateFilter({field: columnField, value}))
  }, [dispatch]);

  const handleSortModelChange = React.useCallback((sortModel: GridSortModel) => {
    // Here you save the data you need from the sort model
    if(!sortModel[0]){
      dispatch(setTemplateSorter(undefined))
      return
    }
    const {field, sort} = sortModel[0]
    dispatch(setTemplateSorter({field, sort: sort!}))
  }, [dispatch]);

  const data = (): Data => {
    switch (locationIndex) {
      case SYSTEM:
        return {
          columns: templateColumns,
          loading: false,
          table: templateList,
        };
      case NEW_TEMPLATE:
        return {
          columns: newTemplatesColumns,
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage,
          totalPages: Math.ceil(total! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
        };
      case ACCOUNT:
        return {
          columns: templateColumns,
          loading: false,
          table: templateList,
        };
      case TEMPLATE:
        return {
          columns: templateColumns,
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage,
          totalPages: Math.ceil(total! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
        };
      case AWAIT_SIGNING:
        return {
          columns: awaitSigningColumns,
          loading: false,
          table: templateList,
        };
      case TEMPLATE_HISTORY:
        return {
          columns: templateHistoryColumns,
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage,
          totalPages: Math.ceil(total! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
        };
      case PERSONAL:
        return {
          columns: personalDocColumns,
          loading: false,
          table: templateList,
        };
      case SHARED:
        return {
          columns: sharedDocColumns,
          loading: false,
          table: templateList,
        };
      case DOCUMENT_HISTORY:
        return {
          columns: sharedDocColumns,
          loading: false,
          table: templateList,
        };
      default:
        return {table: []};
    }
  };

  const getRowId = (params: GetRowIdParams) => {
    return params.id;
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data().table}
        columns={data().columns!}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={data().loading}
        getRowId={getRowId}
        onFilterModelChange={onFilterChange}
        filterMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        hideFooterPagination
        hideFooter
      />
      {data().table.length > 0 && (
        <CustomPagination
          currentPage={data().currentPage!}
          totalPages={data().totalPages!}
          onChangePage={data().onChangePage!}
        />
      )}
    </div>
    //
  );
};

export default DataTable;
