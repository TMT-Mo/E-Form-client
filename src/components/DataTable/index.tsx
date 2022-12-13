import React, { useCallback, useEffect } from "react";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { handleError, handleSuccess } from "../../slices/notification";
import { useDispatch, useSelector } from "../../hooks";
import { LocationIndex } from "../../utils/constants";
import {
  awaitSigningColumns,
  historyColumns,
  personalDocColumns,
  sharedDocColumns,
  templateColumns,
} from "../../utils/mui-data";
import { Template, TemplateListResponse } from "../../models/template";
import {
  AwaitSigningResponse,
  HistoryResponse,
  PersonalDocResponse,
} from "../../models/document";
import { getTemplates, onChangeTemplatePage } from "../../slices/template";
import { setPagination } from "../../slices/pagination";
import { Pagination } from "@mui/material";
import CustomPagination from "./Pagination";

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
  const { locationIndex } = useSelector((state) => state.location);
  const {
    isGetTemplatesLoading,
    templateList,
    searchItemValue,
    total,
    currentPage,
  } = useSelector((state) => state.template);

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    // Here you save the data you need from the filter model
    console.log({ filterModel: { ...filterModel } });
  }, []);

  const data = (): Data => {
    switch (locationIndex) {
      case DEPARTMENT:
        return {
          columns: templateColumns,
          loading: false,
          table: templateList,
        };
      case POSITION:
        return {
          columns: templateColumns,
          loading: false,
          table: templateList,
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
      case AWAITSIGNING:
        return {
          columns: awaitSigningColumns,
          loading: false,
          table: templateList,
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
      default:
        return { columns: historyColumns, loading: false, table: templateList };
    }
  };
  // const request = useCallback(async () => {
  //   try {
  //     await dispatch(
  //       getTemplates({
  //         templateName_contains: searchItemValue || undefined,
  //         _page: currentPage || 0,
  //         _size: 10,
  //         _sort: undefined
  //       })
  //     ).unwrap(); //* Unwrap to catch error when failed

  //   } catch {
  //     dispatch(handleError({ errorMessage: undefined }));
  //   }
  // }, [dispatch, searchItemValue, currentPage]);

  // useEffect(() => {
  //   request();
  // }, [request]);

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
        hideFooterPagination
        hideFooter
        // components={{ Pagination: CustomPagination }}
      />
      {data().currentPage !== undefined && (
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
