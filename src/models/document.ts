
export interface AwaitSigningResponse {}

export interface PersonalDocResponse {}

export interface SharedDocResponse {}

export interface HistoryResponse {}

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
  createdAt_lte?: string //* lte: Lower than equal
  updateAt_gte?: string; //* gte: Greater than equal
  updateAt_lte?: string //* lte: Lower than equal
}

interface Signer {
  username: string;
  signature: string;
  status: number;
  roleName: string;
  updateAt: string
}

interface Creator {
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
  signatoryList: Signer[] | null;
  link: string;
  createdBy: Creator;
  isLocked: boolean | null;
  xfdfString: string;
  reason: string | null;
  version: string | null;
}

export interface DocumentListResponse {
  items: Document[];
  total: number;
  page: number;
  size: number;
}

export interface ApproveDocumentArgs{
  userId: number,
  documentId: number,
  statusDocument: number,
  comment?: string,
  xfdfString: string
}

export interface ApproveDocumentResponse{
  message: string;
}

export interface GetDocumentHistoryArgs extends GetDocumentsArgs{
  userId: number
}

// export interface DocumentHistory extends Document{
//   version: string;
// }
export interface GetDocumentHistoryResponse{
  items: Document[];
  total: number;
  page: number;
  size: number;
}