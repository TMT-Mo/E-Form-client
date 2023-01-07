import React from "react";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "../../hooks";
import {
  DataTableHeader,
  DeviceType,
  LocationIndex,
  Permissions,
} from "../../utils/constants";
import {
  awaitSigningColumns,
  newTemplatesColumns,
  personalDocColumns,
  sharedDocColumns,
  templateColumns,
  templateHistoryColumns,
} from "../../utils/mui-data";
import {
  clearTemplatePagination,
  onChangeTemplatePage,
} from "../../slices/template";
import CustomPagination from "./pagination";
import { usePermission } from "../../hooks/use-permission";
import {
  clearDocumentPagination,
  onChangeDocumentPage,
} from "../../slices/document";
import { GridColumnModel, Data, GetRowIdParams } from "../../models/mui-data";
import { setFilter, setSorter } from "../../slices/filter";
import { helpers } from "../../utils";

const {
  SYSTEM,
  ACCOUNT,
  NEW_TEMPLATE,
  TEMPLATE,
  TEMPLATE_HISTORY,
  AWAIT_SIGNING,
  PERSONAL,
  SHARED,
  DOCUMENT_HISTORY,
} = LocationIndex;

const { ENABLE_TEMPLATE } = Permissions;
const { MOBILE, IPAD, LAPTOP } = DeviceType;

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { locationIndex } = useSelector((state) => state.location);
  const { isGetTemplatesLoading, templateList } = useSelector(
    (state) => state.template
  );
  const { isGetDocumentListLoading, documentList } = useSelector(
    (state) => state.document
  );
  const totalTemplate = useSelector((state) => state.template.total);
  const currentPageTemplate = useSelector(
    (state) => state.template.currentPage
  );
  const totalDocument = useSelector((state) => state.document.total);
  const currentPageDocument = useSelector(
    (state) => state.document.currentPage
  );

  const onFilterChange = React.useCallback(
    (filterModel: GridFilterModel) => {
      // Here you save the data you need from the filter model

      const { value, columnField } = filterModel.items[0];
      if (!value) {
        dispatch(setFilter(undefined));
        return;
      }
      dispatch(clearTemplatePagination());
      dispatch(clearDocumentPagination());
      dispatch(setFilter({ field: columnField as DataTableHeader, value }));
    },
    [dispatch]
  );

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      // Here you save the data you need from the sort model
      if (!sortModel[0]) {
        dispatch(setSorter(undefined));
        return;
      }
      const { field, sort } = sortModel[0];
      dispatch(setSorter({ field: field as DataTableHeader, sort: sort! }));
    },
    [dispatch]
  );

  const columnVisible: GridColumnModel = {
    status: usePermission(ENABLE_TEMPLATE),
    isEnable: usePermission(ENABLE_TEMPLATE),
    type: helpers.checkHideColumn(IPAD),
    description: helpers.checkHideColumn(IPAD),
    createdAt: helpers.checkHideColumn(IPAD),
    updateAt: helpers.checkHideColumn(IPAD),
    createdBy: usePermission(ENABLE_TEMPLATE),
  };

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
          currentPage: currentPageTemplate,
          totalPages: Math.ceil(totalTemplate! / 10),
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
          columns: templateColumns.map((col) =>
            col.field === "isEnable"
              ? { ...col, filterable: columnVisible.isEnable }
              : col
          ),
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage: currentPageTemplate,
          totalPages: Math.ceil(totalTemplate! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
          columnVisible,
        };
      case AWAIT_SIGNING:
        return {
          columns: awaitSigningColumns,
          loading: isGetDocumentListLoading,
          table: documentList,
          currentPage: currentPageDocument,
          totalPages: Math.ceil(totalDocument! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeDocumentPage({ selectedPage: --value })),
        };
      case TEMPLATE_HISTORY:
        return {
          columns: templateHistoryColumns,
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage: currentPageTemplate,
          totalPages: Math.ceil(totalTemplate! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
          columnVisible,
        };
      case PERSONAL:
        return {
          columns: personalDocColumns,
          loading: isGetDocumentListLoading,
          table: documentList,
          currentPage: currentPageDocument,
          totalPages: Math.ceil(totalDocument! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeDocumentPage({ selectedPage: --value })),
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
        return { table: [] };
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
        columnVisibilityModel={
          data().columnVisible as GridColumnVisibilityModel
        }
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
