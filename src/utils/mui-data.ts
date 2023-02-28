import { TranslateContent } from './../components/DataTable/TranslateContent/index';
import { TranslateHeader } from './../components/DataTable/TranslateHeader';

import { renderEditLockTemplateCell, renderLockTemplateCell } from './../components/DataTable/lockTemplate-cell/index';
import { DocumentHistoryActionCell } from "./../components/DataTable/action-cell/documentHistory/index";
import { updatedAtOnlyOperators } from "./../components/DataTable/filter/updatedAt/index";
import { createdByOnlyOperators } from "./../components/DataTable/filter/createdBy/index";
import { PersonalDocumentActionCell } from "./../components/DataTable/action-cell/personalDocument/index";
import { AwaitSigningActionCell } from "./../components/DataTable/action-cell/awaitSigning/index";
import { TemplateHistoryActionCell } from "./../components/DataTable/action-cell/templateHistory/index";
import { statusOnlyOperators } from "./../components/DataTable/filter/status/index";

import { isEnableOnlyOperators } from "./../components/DataTable/filter/isEnable/index";
import { StatusCell } from "./../components/DataTable/status-cell/index";
import { GridColDef } from "@mui/x-data-grid";
import { FileCell } from "../components/DataTable/file-cell";
import { typeOnlyOperators } from "../components/DataTable/filter/type-file";
import { typeTemplateOnlyOperators } from "../components/DataTable/filter/type-template";
import { DataTableHeader, DeviceType, Permissions } from "./constants";
import { TemplateActionCell } from "../components/DataTable/action-cell/template";
import { NewTemplateActionCell } from "../components/DataTable/action-cell/newTemplate";
import { DateCell } from "../components/DataTable/formatDate-cell";
import { CreatedByCell } from "../components/DataTable/createdBy-cell";
import { createdAtOnlyOperators } from "../components/DataTable/filter/createdAt";
import helpers from "./helpers";
import { SharedDocumentActionCell } from "../components/DataTable/action-cell/sharedDocument";
import { renderEditLockDocumentCell, renderLockDocumentCell } from '../components/DataTable/lockDocument-cell';

const {
  TYPE,
  DEPARTMENT,
  IS_ENABLE,
  STATUS,
  TYPE_TEMPLATE,
  TYPE_DOCUMENT,
  ACTION,
  CREATED_AT,
  CREATED_BY,
  DESCRIPTION,
  TEMPLATE_NAME,
  UPDATED_AT,
  DOCUMENT_NAME,
  IS_LOCKED,
} = DataTableHeader;

const { checkHideColumnFromDevice, checkHideColumnFromPermission } = helpers;
const { IPAD } = DeviceType;
const { ENABLE_TEMPLATE, LOCK_DOCUMENT } = Permissions;
export const templateColumns: GridColDef[] = [
  {
    field: TYPE,
    filterOperators: typeOnlyOperators,
    headerName: 'File',
    headerAlign: "center",
    renderCell: FileCell,
    
    align: "center",
    renderHeader: TranslateHeader,
  },
  {
    field: TEMPLATE_NAME,
    headerName: "Name",
    flex: 1,
    minWidth: 200,
    filterable: false,
    hideable: false,
    renderHeader: TranslateHeader,
  },
  {
    field: DESCRIPTION,
    headerName: "Description",
    flex: 1,
    filterable: false,
    renderHeader: TranslateHeader,
  },
  {
    field: TYPE_TEMPLATE,
    headerName: "Type",
    // filterOperators: typeTemplateOnlyOperators,
    renderHeader: TranslateHeader,
    renderCell: TranslateContent
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    align: "center",
    // filterOperators: departmentOnlyOperators,
    filterable: false,
    renderHeader: TranslateHeader,
    renderCell: TranslateContent,
    headerAlign: 'center',
    flex: .5
  },
  {
    field: CREATED_BY,
    headerName: "Created By",
    renderCell: CreatedByCell,
    flex: 0.5,
    filterOperators: createdByOnlyOperators,
    renderHeader: TranslateHeader,
  },
  // {
  //   field: STATUS,
  //   headerName: "Status",
  //   renderCell: StatusCell,
  //   filterable: false,
  //   headerAlign: "center",
  //   disableColumnMenu: true,
  //   hideable: checkHideColumnFromPermission(ENABLE_TEMPLATE)
  // },
  {
    field: IS_ENABLE,
    headerName: "Is Enable",
    renderEditCell: renderEditLockTemplateCell,
    editable: true,
    renderCell: renderLockTemplateCell,
    align: "center",
    filterOperators: isEnableOnlyOperators,
    headerAlign: "center",
    filterable: checkHideColumnFromPermission(ENABLE_TEMPLATE),
    hideable: checkHideColumnFromPermission(ENABLE_TEMPLATE),
    renderHeader: TranslateHeader,
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: TemplateActionCell,
    filterable: false,
    sortable: false,
    hideable: false,
    align: "center",
    headerAlign: "center",
    renderHeader: TranslateHeader,
  },
];

export const templateHistoryColumns: GridColDef[] = [
  {
    field: TYPE,
    headerName: "File",
    filterOperators: typeOnlyOperators,
    headerAlign: "center",
    renderCell: FileCell,
    align: "center",
    renderHeader: TranslateHeader,
  },
  {
    field: TEMPLATE_NAME,
    headerName: "Name",
    flex: 1,
    filterable: false,
    minWidth: 200,
    hideable: false,
    renderHeader: TranslateHeader,
  },
  {
    field: DESCRIPTION,
    headerName: "Description",
    flex: 1,
    filterable: false,
    renderHeader: TranslateHeader,
  },
  {
    field: TYPE_TEMPLATE,
    headerName: "Type",
    filterOperators: typeTemplateOnlyOperators,
    renderHeader: TranslateHeader,
    renderCell: TranslateContent
  },
  {
    field: DEPARTMENT,
    renderCell: TranslateContent,
    headerName: "Department",
    align: "center",
    headerAlign: 'center',
    flex: .5,
    renderHeader: TranslateHeader,
  },
  {
    field: STATUS,
    headerName: "Status",
    renderCell: StatusCell,
    filterOperators: statusOnlyOperators,
    headerAlign: "center",
    renderHeader: TranslateHeader,
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    flex: 0.4,
    minWidth: 100,
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    renderHeader: TranslateHeader,
    filterOperators: createdAtOnlyOperators,
  },
  {
    field: UPDATED_AT,
    headerName: "Date Modified",
    flex: 0.4,
    minWidth: 100,
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    filterOperators: updatedAtOnlyOperators,
    renderHeader: TranslateHeader,
  },
  {
    field: ACTION,
    headerName: "Action",
    filterable: false,
    renderCell: TemplateHistoryActionCell,
    sortable: false,
    hideable: false,
    renderHeader: TranslateHeader,
  },
];

export const newTemplatesColumns: GridColDef[] = [
  {
    field: TYPE,
    headerName: "File",
    filterOperators: typeOnlyOperators,
    headerAlign: "center",
    renderCell: FileCell,
    align: "center",
    renderHeader: TranslateHeader,
  },
  {
    field: TEMPLATE_NAME,
    headerName: "Name",
    flex: 1,
    filterable: false,
    minWidth: 200,
    renderHeader: TranslateHeader,
  },
  {
    field: DESCRIPTION,
    headerName: "Description",
    flex: 1,
    filterable: false,
    renderHeader: TranslateHeader,
  },
  {
    field: TYPE_TEMPLATE,
    headerName: "Type",
    filterOperators: typeTemplateOnlyOperators,
    renderHeader: TranslateHeader,
    renderCell: TranslateContent
  },
  {
    field: DEPARTMENT,
    renderCell: TranslateContent,
    headerName: "Department",
    align: "center",
    headerAlign: 'center',
    flex: .5,
    renderHeader: TranslateHeader,
  },
  {
    field: CREATED_BY,
    headerName: "Created By",
    renderCell: CreatedByCell,
    flex: 0.5,
    filterOperators: createdByOnlyOperators,
    minWidth: 200,
    renderHeader: TranslateHeader,
  },
  {
    field: CREATED_AT,
    headerName: "Date Created",
    renderCell: DateCell,
    align: "center",
    resizable: false,
    filterOperators: createdAtOnlyOperators,
    renderHeader: TranslateHeader,
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: NewTemplateActionCell,
    filterable: false,
    sortable: false,
    hideable: false,
    renderHeader: TranslateHeader,
  },
];

export const awaitSigningColumns: GridColDef[] = [
  {
    field: TYPE,
    headerName: "File",
    filterOperators: typeOnlyOperators,
    headerAlign: "center",
    renderCell: FileCell,
    align: "center",
    hide: !checkHideColumnFromDevice(IPAD),
    renderHeader: TranslateHeader,
  },
  {
    field: DOCUMENT_NAME,
    headerName: "Name",
    flex: 1,
    disableColumnMenu: true,
    hideable: false,
    filterable: false,
    minWidth: 200,
    renderHeader: TranslateHeader,
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    renderCell: DateCell,
    align: "center",
    flex: 0.2,
    headerAlign: "center",
    filterOperators: createdAtOnlyOperators,
    minWidth: 100,
    renderHeader: TranslateHeader,
  },
  {
    field: CREATED_BY,
    headerName: "Owner",
    sortable: false,
    hideable: false,
    flex: 0.5,
    minWidth: 200,
    renderCell: CreatedByCell,
    filterOperators: createdByOnlyOperators,
    renderHeader: TranslateHeader,
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: AwaitSigningActionCell,
    filterable: false,
    sortable: false,
    hideable: false,
    renderHeader: TranslateHeader,
  },
];

export const personalDocColumns: GridColDef[] = [
  {
    field: TYPE,
    headerName: "File",
    filterOperators: typeOnlyOperators,
    headerAlign: "center",
    renderCell: FileCell,
    align: "center",
    hide: !checkHideColumnFromDevice(IPAD),
    renderHeader: TranslateHeader,
  },
  {
    field: DOCUMENT_NAME,
    headerName: "Name",
    flex: 1,
    minWidth: 200,
    renderHeader: TranslateHeader,
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    flex: 0.2,
    filterOperators: createdAtOnlyOperators,
    minWidth: 100,
    hide: !checkHideColumnFromDevice(IPAD),
    renderHeader: TranslateHeader,
  },
  {
    field: UPDATED_AT,
    headerName: "Date Modified",
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    flex: 0.2,
    minWidth: 100,
    filterOperators: updatedAtOnlyOperators,
    renderHeader: TranslateHeader,
  },
  {
    field: STATUS,
    headerName: "Status",
    align: "center",
    renderCell: StatusCell,
    headerAlign: "center",
    renderHeader: TranslateHeader,
  },
  {
    field: IS_LOCKED,
    headerName: "Is Locked",
    renderEditCell: renderEditLockDocumentCell,
    editable: true,
    renderCell: renderLockDocumentCell,
    align: "center",
    filterOperators: isEnableOnlyOperators,
    headerAlign: "center",
    filterable: checkHideColumnFromPermission(LOCK_DOCUMENT),
    hideable: checkHideColumnFromPermission(LOCK_DOCUMENT),
    renderHeader: TranslateHeader,
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: PersonalDocumentActionCell,
    filterable: false,
    sortable: false,
    hideable: false,
    renderHeader: TranslateHeader,
  },
];

export const sharedDocColumns: GridColDef[] = [
  {
    field: TYPE,
    headerName: "File",
    filterOperators: typeOnlyOperators,
    headerAlign: "center",
    renderCell: FileCell,
    align: "center",
    hide: !checkHideColumnFromDevice(IPAD),
    renderHeader: TranslateHeader,
  },
  {
    field: DOCUMENT_NAME,
    headerName: "Name",
    flex: 1,
    disableColumnMenu: true,
    hideable: false,
    filterable: false,
    renderHeader: TranslateHeader,
    minWidth: 200,
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    renderCell: DateCell,
    align: "center",
    flex: 0.3,
    headerAlign: "center",
    filterOperators: createdAtOnlyOperators,
    minWidth: 100,
    renderHeader: TranslateHeader,
  },
  // { field: "datePublished", headerName: "Date Published", flex: 1 },
  {
    field: UPDATED_AT,
    headerName: "Date Modified",
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    flex: 0.3,
    minWidth: 100,
    filterOperators: updatedAtOnlyOperators,
    renderHeader: TranslateHeader,
  },
  {
    field: DEPARTMENT,
    renderCell: TranslateContent,
    headerName: "Department",
    headerAlign: 'center',
    flex: .5,
    renderHeader: TranslateHeader,
  },
  {
    field: STATUS,
    headerName: "Status",
    flex: 1,
    renderHeader: TranslateHeader,
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: SharedDocumentActionCell,
    filterable: false,
    sortable: false,
    hideable: false,
    renderHeader: TranslateHeader,
    flex: 1
  },
];

export const historyDocColumns: GridColDef[] = [
  {
    field: TYPE,
    headerName: "File",
    filterOperators: typeOnlyOperators,
    headerAlign: "center",
    renderCell: FileCell,
    align: "center",
    renderHeader: TranslateHeader,
  },
  {
    field: DOCUMENT_NAME,
    headerName: "Name",
    flex: 1,
    disableColumnMenu: true,
    hideable: false,
    filterable: false,
    minWidth: 200,
    renderHeader: TranslateHeader,
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    flex: 0.3,
    filterOperators: createdAtOnlyOperators,
    minWidth: 100,
    renderHeader: TranslateHeader,
    hide: !checkHideColumnFromDevice(IPAD),
  },
  {
    field: UPDATED_AT,
    headerName: "Date Modified",
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    flex: 0.3,
    minWidth: 100,
    filterOperators: updatedAtOnlyOperators,
    renderHeader: TranslateHeader,
  },
  {
    field: TYPE_DOCUMENT,
    headerName: "Type",
    filterOperators: typeTemplateOnlyOperators,
    renderHeader: TranslateHeader,
    renderCell: TranslateContent
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    align: "center",
    renderHeader: TranslateHeader,
    headerAlign: 'center',
    flex: .5
  },
  {
    field: STATUS,
    headerName: "Status",
    align: "center",
    renderCell: StatusCell,
    headerAlign: "center",
    renderHeader: TranslateHeader,
  },
  {
    field: "version",
    headerName: "Version",
    renderHeader: TranslateHeader,
    align: 'center',
    headerAlign: "center"
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: DocumentHistoryActionCell,
    filterable: false,
    sortable: false,
    hideable: false,
    renderHeader: TranslateHeader,
  },
];
