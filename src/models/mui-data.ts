import { GridColDef } from "@mui/x-data-grid";
import { Document } from "./document";
import { Template } from "./template";

export interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id: number;
}

export interface GridColumnModel {
  status?: boolean;
  isEnable?: boolean;
  type?: boolean;
  typeName?: boolean;
  departmentName?: boolean;
  templateName?: boolean;
  description?: boolean;
  action?: boolean;
  createdAt?: boolean;
  updateAt?: boolean;
  createdBy?: boolean;
}

export interface Data {
  columns?: GridColDef[];
  loading?: boolean;
  table: Template[] | Document[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
  columnVisible?: GridColumnModel;
}
