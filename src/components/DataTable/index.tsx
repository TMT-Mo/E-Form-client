import React from "react";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "../../hooks";
import { LocationIndex } from "../../utils/constants";
import {
  awaitSigningColumns,
  historyColumns,
  personalDocColumns,
  sharedDocColumns,
  templateColumns,
} from "../../utils/mui-data";
import { Template } from "../../models/template";
import { onChangeTemplatePage } from "../../slices/template";
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
      case SYSTEM:
        return {
          columns: templateColumns,
          loading: false,
          table: templateList,
        };
      case NEW_TEMPLATE:
        return {
          columns: templateColumns,
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
          columns: templateColumns,
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
