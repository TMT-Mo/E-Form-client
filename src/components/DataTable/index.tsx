import React from "react";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridSortModel,
  viVN,
  enUS,
  GridColDef,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "hooks";
import {
  DataTableHeader,
  DeviceType,
  LocationIndex,
  Permissions,
} from "utils/constants";
import {
  accountColumns,
  awaitSigningColumns,
  historyDocColumns,
  newTemplatesColumns,
  personalDocColumns,
  sharedDocColumns,
  templateColumns,
  templateHistoryColumns,
} from "utils/mui-data";
import { clearTemplatePagination, onChangeTemplatePage } from "slices/template";
import CustomPagination from "./pagination";
import { usePermission } from "hooks/use-permission";
import { clearDocumentPagination, onChangeDocumentPage } from "slices/document";
import { GridColumnModel, Data, GetRowIdParams } from "models/mui-data";
import { setFilter, setSorter } from "slices/filter";
import { helpers } from "utils";
import CustomNoRow from "components/CustomNoRow";
import { useTranslation } from "react-i18next";
import { clearAccountPagination, onChangeAccountPage } from "slices/system";
import { TemplateHistoryToolBar } from "components/DataTable/toolbar/Template/template-history";
import { TemplateManagementToolbar } from "components/DataTable/toolbar/Template/template-management";
import { NewTemplateToolBar } from "components/DataTable/toolbar/Template/new-template";
import { AwaitSigningDocumentToolBar } from "components/DataTable/toolbar/Document/await-signing";
import { PersonalDocumentToolBar } from "components/DataTable/toolbar/Document/personal";
import { SharedDocumentToolBar } from "components/DataTable/toolbar/Document/shared";
import { HistoryDocumentToolBar } from "components/DataTable/toolbar/Document/history";
import { AccountManagementToolBar } from "components/DataTable/toolbar/System/account-management";

const {
  SYSTEM,
  NEW_TEMPLATE,
  TEMPLATE,
  TEMPLATE_HISTORY,
  AWAIT_SIGNING,
  PERSONAL,
  SHARED,
  DOCUMENT_HISTORY,
} = LocationIndex;

const { ENABLE_TEMPLATE } = Permissions;
const { IPAD, MOBILE } = DeviceType;
const { checkHideColumnFromDevice } = helpers;

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>();
  const { locationIndex } = useSelector((state) => state.location);
  const { isGetTemplatesLoading, templateList } = useSelector(
    (state) => state.template
  );
  const { isGetUserListLoading, userList } = useSelector(
    (state) => state.system
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
  const totalAccount = useSelector((state) => state.system.total);
  const currentPageAccount = useSelector((state) => state.system.currentPage);

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
      dispatch(clearAccountPagination());
      dispatch(setFilter({ field: columnField as DataTableHeader, value }));
    },
    [dispatch]
  );

  const onTranslateFilter = (
    table: GridColDef[] | undefined
  ): GridColDef[] | undefined => {
    if (!table) return undefined;
    let translatedTable: GridColDef[] = [];
    for (let i = 0; i < table.length; i++) {
      const currentValue = table[i];
      let translateFilter = currentValue.filterOperators;
      if (translateFilter) {
        const filter = { ...translateFilter[0] };
        translateFilter[0] = { ...filter, label: t(filter.label!) };
      }
      const item: GridColDef = {
        ...currentValue,
        headerName: t(currentValue.headerName!),
        filterOperators: translateFilter,
      };
      translatedTable.push(item);
    }
    return translatedTable;
  };

  // console.log(templateColumns.forEach(col => console.log(col)))

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
    status: usePermission(ENABLE_TEMPLATE) && checkHideColumnFromDevice(IPAD),
    isEnable: usePermission(ENABLE_TEMPLATE),
    type: checkHideColumnFromDevice(IPAD),
    description: checkHideColumnFromDevice(IPAD),
    createdAt: checkHideColumnFromDevice(IPAD),
    updateAt: checkHideColumnFromDevice(IPAD),
    createdBy: checkHideColumnFromDevice(IPAD),
  };

  const data = (): Data => {
    switch (locationIndex) {
      case SYSTEM:
        return {
          columns: onTranslateFilter(accountColumns),
          loading: isGetUserListLoading,
          table: userList,
          currentPage: currentPageAccount,
          totalPages: Math.ceil(totalAccount! / 10),
          onChangePage: (e, value) => {
            dispatch(onChangeAccountPage({ selectedPage: --value }));
          },
          columnVisible,
          toolbar: AccountManagementToolBar,
        };
      case NEW_TEMPLATE:
        return {
          columns: onTranslateFilter(newTemplatesColumns),
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage: currentPageTemplate,
          totalPages: Math.ceil(totalTemplate! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
          columnVisible,
          toolbar: NewTemplateToolBar,
        };
      // case ACCOUNT:
      //   return {
      //     columns: onTranslateFilter(accountColumns),
      //     loading: isGetUserListLoading,
      //     table: userList,
      //     currentPage: currentPageAccount,
      //     totalPages: Math.ceil(totalAccount! / 10),
      //     onChangePage: (e, value) =>
      //       dispatch(onChangeAccountPage({ selectedPage: --value })),
      //     columnVisible,
      //   };
      case TEMPLATE: {
        return {
          columns: onTranslateFilter(templateColumns),
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage: currentPageTemplate,
          totalPages: Math.ceil(totalTemplate! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
          columnVisible,
          toolbar: TemplateManagementToolbar,
        };
      }

      case AWAIT_SIGNING:
        return {
          columns: onTranslateFilter(awaitSigningColumns),
          loading: isGetDocumentListLoading,
          table: documentList,
          currentPage: currentPageDocument,
          totalPages: Math.ceil(totalDocument! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeDocumentPage({ selectedPage: --value })),
          toolbar: AwaitSigningDocumentToolBar,
          columnVisible
        };
      case TEMPLATE_HISTORY:
        return {
          columns: onTranslateFilter(templateHistoryColumns),
          loading: isGetTemplatesLoading,
          table: templateList,
          currentPage: currentPageTemplate,
          totalPages: Math.ceil(totalTemplate! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeTemplatePage({ selectedPage: --value })),
          columnVisible,
          toolbar: TemplateHistoryToolBar,
        };
      case PERSONAL:
        return {
          columns: onTranslateFilter(personalDocColumns),
          loading: isGetDocumentListLoading,
          table: documentList,
          currentPage: currentPageDocument,
          totalPages: Math.ceil(totalDocument! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeDocumentPage({ selectedPage: --value })),
          toolbar: PersonalDocumentToolBar,
          columnVisible
        };
      case SHARED:
        return {
          columns: onTranslateFilter(sharedDocColumns),
          loading: isGetDocumentListLoading,
          table: documentList,
          currentPage: currentPageDocument,
          totalPages: Math.ceil(totalDocument! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeDocumentPage({ selectedPage: --value })),
          toolbar: SharedDocumentToolBar,
          columnVisible
        };
      case DOCUMENT_HISTORY:
        return {
          columns: onTranslateFilter(historyDocColumns),
          loading: isGetDocumentListLoading,
          table: documentList,
          currentPage: currentPageDocument,
          totalPages: Math.ceil(totalDocument! / 10),
          onChangePage: (e, value) =>
            dispatch(onChangeDocumentPage({ selectedPage: --value })),
          toolbar: HistoryDocumentToolBar,
          columnVisible
        };
      default:
        return { table: [] };
    }
  };

  const getRowId = (params: GetRowIdParams) => {
    return params.id;
  };

  return (
    <div style={{ height: 675, width: "100%" }}>
      <DataGrid
        rows={data().table}
        columns={data().columns!}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={data().loading}
        getRowId={getRowId}
        onFilterModelChange={onFilterChange}
        filterMode="server"
        // filterModel={data().filterModel!}
        sortingMode="server"
        localeText={
          (i18n.language === "vn" ? viVN : enUS).components.MuiDataGrid
            .defaultProps.localeText
        }
        onSortModelChange={handleSortModelChange}
        columnVisibilityModel={
          columnVisibilityModel
            ? columnVisibilityModel
            : (data().columnVisible! as GridColumnVisibilityModel)
        }
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        hideFooterPagination
        hideFooter
        
        components={{
          NoRowsOverlay: CustomNoRow,
          Toolbar: data().toolbar,
        }}
        componentsProps={{
          panel: {
            placement: "bottom-end",
          },
          columnsPanel: {
            sx: {
              "& .MuiDataGrid-panelFooter button:first-child": {
                display: "none"
              },
            }
          },
          filterPanel:{
            sx:{
              '& .MuiDataGrid-filterForm':{
                // scale: '80%',
                maxWidth: `${window.innerWidth < 720 ? '270px' : '500px'}`
              },
              '& .MuiDataGrid-filterFormOperatorInput': {
                display: 'flex',
                justifyContent: 'center'
              }
            }
          }
        }}
        sx={{
          borderTop: "none",
          ".MuiDataGrid-columnHeaders": {
            borderTop: "1px solid #E0E0E0",
          },
        }}
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
