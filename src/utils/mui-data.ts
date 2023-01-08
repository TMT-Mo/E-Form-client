import { updatedAtOnlyOperators } from './../components/DataTable/filter/updatedAt/index';
import { createdByOnlyOperators } from './../components/DataTable/filter/createdBy/index';
import { usePermission } from './../hooks/use-permission';
import { PersonalDocumentActionCell } from "./../components/DataTable/action-cell/personalDocument/index";
import { AwaitSigningActionCell } from "./../components/DataTable/action-cell/awaitSigning/index";
import { TemplateHistoryActionCell } from "./../components/DataTable/action-cell/templateHistory/index";
import { statusOnlyOperators } from "./../components/DataTable/filter/status/index";

import { isEnableOnlyOperators } from "./../components/DataTable/filter/isEnable/index";
import { StatusCell } from "./../components/DataTable/status-cell/index";
import { ReactNode } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Template } from "../models/template";
import { FileCell } from "../components/DataTable/file-cell";
import { IsEnableCell } from "../components/DataTable/isEnable-cell";
import { typeOnlyOperators } from "../components/DataTable/filter/type-file";
import { typeTemplateOnlyOperators } from "../components/DataTable/filter/type-template";
import { DataTableHeader } from "./constants";
import { TemplateActionCell } from "../components/DataTable/action-cell/template";
import { NewTemplateActionCell } from "../components/DataTable/action-cell/newTemplate";
import { departmentOnlyOperators } from "../components/DataTable/filter/department";
import { DateCell } from "../components/DataTable/formatDate-cell";
import { IsLockedCell } from "../components/DataTable/isLocked-cell";
import { CreatedByCell } from "../components/DataTable/createdBy-cell";
import { createdAtOnlyOperators } from '../components/DataTable/filter/createdAt';
import helpers from './helpers';

const {
  TYPE,
  DEPARTMENT,
  IS_ENABLE,
  STATUS,
  TYPE_TEMPLATE,
  ACTION,
  CREATED_AT,
  CREATED_BY,
  DESCRIPTION,
  TEMPLATE_NAME,
  UPDATED_AT,
  DOCUMENT_NAME,
  IS_LOCKED,
} = DataTableHeader;

export const templateColumns: GridColDef[] = [
  {
    field: TYPE,
    headerName: "File",
    filterOperators: typeOnlyOperators,
    // hide: helpers.checkHideColumn(IPAD)
    
    headerAlign: "center",
    renderCell: FileCell,
    align: "center",
  },
  {
    field: TEMPLATE_NAME,
    headerName: "Name",
    flex: 1,
    filterable: false,
  },
  {
    field: DESCRIPTION,
    headerName: "Description",
    flex: 1,
    filterable: false,
  },
  {
    field: TYPE_TEMPLATE,
    headerName: "Type",
    filterOperators: typeTemplateOnlyOperators,
    headerAlign: 'center' 
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    align: "center",
    // filterOperators: departmentOnlyOperators,
    filterable: false,
  },
  {
    field: CREATED_BY,
    headerName: "Created By",
    renderCell: CreatedByCell,
    flex: 0.5,
    filterOperators: createdByOnlyOperators
  },
  {
    field: STATUS,
    headerName: "Status",
    renderCell: StatusCell,
    filterable: false,
    headerAlign: 'center',
  },
  {
    field: IS_ENABLE,
    headerName: "Is Enable",
    renderCell: IsEnableCell,
    align: "center",
    filterOperators: isEnableOnlyOperators,
    headerAlign: 'center',
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: TemplateActionCell,
    filterable: false,
    sortable: false,
    align: 'center',
    headerAlign: 'center'
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
  },
  {
    field: TEMPLATE_NAME,
    headerName: "Name",
    flex: 1,
    filterable: false,
  },
  { field: DESCRIPTION, headerName: "Description", flex: 1, filterable: false },
  {
    field: TYPE_TEMPLATE,
    headerName: "Type",
    filterOperators: typeTemplateOnlyOperators,
    headerAlign: 'center' 
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    align: "center",
  },
  {
    field: STATUS,
    headerName: "Status",
    renderCell: StatusCell,
    filterOperators: statusOnlyOperators,
    headerAlign: "center",
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    flex: 0.4,
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    filterOperators: createdAtOnlyOperators
  },
  {
    field: UPDATED_AT,
    headerName: "Date Modified",
    flex: 0.4,
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    filterOperators: updatedAtOnlyOperators
  },
  {
    field: ACTION,
    headerName: "Action",
    filterable: false,
    renderCell: TemplateHistoryActionCell,
    sortable: false
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
  },
  {
    field: TEMPLATE_NAME,
    headerName: "Name",
    flex: 1,
    filterable: false,
  },
  { field: DESCRIPTION, headerName: "Description", flex: 1, filterable: false },
  {
    field: TYPE_TEMPLATE,
    headerName: "Type",
    filterOperators: typeTemplateOnlyOperators,
    headerAlign: 'center' 
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    align: "center",
  },
  {
    field: CREATED_BY,
    headerName: "Created By",
    renderCell: CreatedByCell,
    flex: 0.5,
    filterOperators: createdByOnlyOperators
  },
  {
    field: CREATED_AT,
    headerName: "Date Created",
    renderCell: DateCell,
    align: "center",
    filterOperators: createdAtOnlyOperators
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: NewTemplateActionCell,
    filterable: false,
    sortable: false
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
  },
  {
    field: DOCUMENT_NAME,
    headerName: "Name",
    flex: 1,
    disableColumnMenu: true,
    filterable: false,
    
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    renderCell: DateCell,
    align: "center",
    flex: 0.2,
    headerAlign: "center",
    filterOperators: createdAtOnlyOperators
  },
  {
    field: CREATED_BY,
    headerName: "Owner",
    sortable: false,
    hideable: false,
    flex: 0.5,
    renderCell: CreatedByCell,
    filterOperators: createdByOnlyOperators
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: AwaitSigningActionCell,
    filterable: false,
    sortable: false
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
  },
  {
    field: DOCUMENT_NAME,
    headerName: "Name",
    flex: 1,
  },
  {
    field: CREATED_AT,
    headerName: "Date Published",
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    flex: 0.2,
    filterOperators: createdAtOnlyOperators
  },
  {
    field: UPDATED_AT,
    headerName: "Date Modified",
    renderCell: DateCell,
    align: "center",
    headerAlign: "center",
    flex: 0.2,
    filterOperators: updatedAtOnlyOperators
  },
  {
    field: STATUS,
    headerName: "Status",
    align: "center",
    renderCell: StatusCell,
    headerAlign: "center",
  },
  {
    field: IS_LOCKED,
    headerName: "Is Locked",
    renderCell: IsLockedCell,
    align: "center",
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: PersonalDocumentActionCell,
    filterable: false,
    sortable: false
  },
];

export const sharedDocColumns: GridColDef[] = [
  { field: "file", headerName: "File", flex: 0.5 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  // { field: "datePublished", headerName: "Date Published", flex: 1 },
  { field: "dateModified", headerName: "Date Modified", flex: 1 },
  {
    field: TYPE,
    headerName: "Type",
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    flex: 1,
  },
  {
    field: STATUS,
    headerName: "Status",
    flex: 1,
  },
  {
    field: ACTION,
    headerName: "Action",
    flex: 1,
  },
];

export const historyColumns: GridColDef[] = [
  { field: "file", headerName: "File", flex: 0.5 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  { field: "datePublished", headerName: "Date Published", flex: 1 },
  { field: "dateModified", headerName: "Date Modified", flex: 1 },
  {
    field: TYPE,
    headerName: "Type",
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    flex: 1,
  },
  {
    field: STATUS,
    headerName: "Status",
    flex: 1,
  },
  {
    field: "version",
    headerName: "Version",
    flex: 1,
  },
  {
    field: ACTION,
    headerName: "Action",
    flex: 1,
  },
];
