import { TemplateHistoryActionCell } from './../components/DataTable/action-cell/templateHistory/index';
import { statusOnlyOperators } from "./../components/DataTable/filter/status/index";

import { isEnableOnlyOperators } from "./../components/DataTable/filter/isEnable/index";
import { StatusCell } from "./../components/DataTable/status-cell/index";
import { ReactNode } from "react";
import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";
import { Template } from "../models/template";
import { FileCell } from "../components/DataTable/file-cell";
import { IsEnableCell } from "../components/DataTable/isEnable-cell";
import { typeOnlyOperators } from "../components/DataTable/filter/type-file";
import { typeTemplateOnlyOperators } from "../components/DataTable/filter/type-template";
import { DataTableHeader, Permissions } from "./constants";
import { TemplateActionCell } from "../components/DataTable/action-cell/template";
import { NewTemplateActionCell } from "../components/DataTable/action-cell/newTemplate";
import { departmentOnlyOperators } from "../components/DataTable/filter/department";


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
} = DataTableHeader;



export const templateColumns: GridColDef[] = [
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
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    align: "center",
    // filterOperators: departmentOnlyOperators,
    filterable: false,
  },
  {
    field: STATUS,
    headerName: "Status",
    renderCell: StatusCell,
    filterable: false,
  },
  {
    field: IS_ENABLE,
    headerName: "Is Enable",
    renderCell: IsEnableCell,
    align: "center",
    filterOperators: isEnableOnlyOperators,
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: TemplateActionCell,
    filterable: false,
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
    headerName: "Created At",
    flex: 0.4
  },
  {
    field: UPDATED_AT,
    headerName: "Updated At",
    filterable: false,
    flex: 0.4
  },
  {
    field: ACTION,
    headerName: "Action",
    filterable: false,
    renderCell: TemplateHistoryActionCell,
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
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    align: "center",
  },
  {
    field: CREATED_BY,
    headerName: "Created By",
  },
  {
    field: CREATED_AT,
    headerName: "Created At",
  },
  {
    field: ACTION,
    headerName: "Action",
    renderCell: NewTemplateActionCell,
    filterable: false,
  },
];

export const awaitSigningColumns: GridColDef[] = [
  { field: "file", headerName: "File", flex: 0.5 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
  },
  { field: "datePublished", headerName: "Date published", flex: 1 },
  {
    field: TYPE,
    headerName: "Type",
    type: "number",
    flex: 1,
  },
  {
    field: DEPARTMENT,
    headerName: "Department",
    sortable: false,
    hideable: false,
    flex: 1,
    filterable: false,
  },
  {
    field: "owner",
    headerName: "Owner",
    sortable: false,
    hideable: false,
    flex: 1,
    filterable: false,
  },
];

export const personalDocColumns: GridColDef[] = [
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
    field: "lock",
    headerName: "Lock",
    flex: 1,
  },
  {
    field: ACTION,
    headerName: "Action",
    flex: 1,
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

interface ITemplates {
  file: ReactNode;
  name: string;
  description: string;
  type: ".pdf" | ".doc";
  department: string;
  status: string;
  action: ReactNode;
}

export const templateRows = (data: Template[]) => {
  const row: ITemplates[] = [];
  data.map((item) => row.push());
};
