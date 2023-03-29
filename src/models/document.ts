import { IUser, Department } from "./system";

export interface CreateDocumentArgs {
  idTemplate: number;
  createdBy: number;
  xfdfString: string;
}

export interface CreateDocumentResponse {
  message: string;
}

export interface GetDocumentsArgs {
  _page?: number;
  _size?: number;
  _sort?: string;
  status_eq?: number;
  createdBy_eq?: number;
  type_eq?: string;
  typeName_eq?: string;
  department_eq?: string;
  isLocked_eq?: boolean;
  documentName_contains?: string;
  signatoryList_contains?: number;
  createdAt_gte?: string; //* gte: Greater than equal
  createdAt_lte?: string; //* lte: Lower than equal
  updateAt_gte?: string; //* gte: Greater than equal
  updateAt_lte?: string; //* lte: Lower than equal
}

interface Creator {
  id: number;
  departmentName: string;
  username: string;
  signature: string;
  status: number;
  roleName: string;
}

export interface Document {
  id: number;
  createdAt: string;
  updateAt: string;
  documentName: string;
  type: string;
  description: string;
  size: number;
  status: number;
  typeName: string;
  departmentName: string;
  signatoryList: IUser[] | null;
  link: string;
  createdBy: Creator;
  isLocked: boolean | null;
  xfdfString: string;
  reason: string | null;
  version: string | null;
  departmentId: number;
}

export interface DocumentListResponse {
  items: Document[];
  total: number;
  page: number;
  size: number;
}

export interface ApproveDocumentArgs {
  userId: number;
  documentId: number;
  statusDocument: number;
  comment?: string;
  xfdfString: string;
}

export interface ApproveDocumentResponse {
  message: string;
}

export interface GetDocumentHistoryArgs extends GetDocumentsArgs {
  userId: number;
}

export interface GetDocumentHistoryResponse {
  items: Document[];
  total: number;
  page: number;
  size: number;
}

export interface GetSharedDocumentArgs extends GetDocumentsArgs {
  IdUserShared_contains: number;
}
export interface GetSharedDocumentResponse {
  items: Document[];
  total: number;
  page: number;
  size: number;
}

export interface LockDocumentArgs {
  id: number;
  isLocked: boolean;
}

export interface LockDocumentResponse {
  message: string;
}

export interface ChangeSignerDocumentArgs {
  idDocument: number;
  signatoryList: number[];
}

export interface ChangeSignerDocumentResponse {
  message: string;
}

export interface ShareDepartmentsArgs {
  idDocument: number;
  departmentIdList: number[];
}
export interface ShareDepartmentsResponse {
  message: string;
}
export interface ShareUsersArgs {
  idDocument: number;
  userIdList: number[];
}
export interface ShareUsersResponse {
  message: string;
}

export interface SharedUser {
  id: number;
  createdAt: string;
  updateAt: string;
  userName: string;
  signature: null | string;
  roleName: null | string;
  departmentName: null | string;
}

export interface GetSharedUsersArgs {
  idDocument: number;
}
export interface GetSharedUsersResponse {
  items: [
    {
      documentId: number;
      users: SharedUser[];
      status: number;
    }
  ];
  total: number;
  page: number;
  size: number;
}
export interface GetSharedDepartmentsArgs {
  idDocument: number;
}
export interface GetSharedDepartmentsResponse {
  items: [
    {
      documentId: number;
      departments: Department[];
      status: number;
    }
  ];
  total: number;
  page: number;
  size: number;
}
