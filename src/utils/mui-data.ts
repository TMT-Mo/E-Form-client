import { ReactNode } from 'react';
import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";
import { Template, } from "../models/template";
import { ActionCell } from '../components/DataTable/ActionCell';



export const templateColumns: GridColDef[] = [
  { field: "typeFile", headerName: "File", flex: 0.5, filterOperators: getGridStringOperators().filter(
    (operator) => operator.value === 'contains',
  ), },
  {
    field: "templateName",
    headerName: "Name",
    flex: 1,
  },
  { field: "description", headerName: "Description", flex: 1 },
  {
    field: "typeTemplate",
    headerName: "Type",
  },
  {
    field: "departmentName",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: ActionCell 
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
    field: "type",
    headerName: "Type",
    type: "number",
    flex: 1,
  },
  {
    field: "department",
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
    field: "type",
    headerName: "Type",
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "lock",
    headerName: "Lock",
    flex: 1,
  },
  {
    field: "action",
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
    field: "type",
    headerName: "Type",
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "action",
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
    field: "type",
    headerName: "Type",
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "version",
    headerName: "Version",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
  },
];

interface ITemplates{
  file: ReactNode,
  name: string,
  description: string,
  type: '.pdf' | '.doc',
  department: string,
  status: string,
  action: ReactNode
}

export const templateRows = (data: Template[]) => {
  const row: ITemplates[] = []
  data.map(item => row.push())
}