
import { StatusTemplate } from "./../utils/constants";
import { StorageReference } from "firebase/storage";

interface Signer {
  username: string;
  signature: string;
  status: number;
  roleName: string;
}
interface Creator {
  username: string;
  signature: string;
  status: number;
  roleName: string;
}

export interface Template {
  id: number;
  createdAt: string;
  updateAt: string;
  templateName: string;
  type: string;
  description: string;
  size: number;
  status: number;
  typeName: string;
  departmentName: string;
  isEnable: boolean;
  signatoryList: Signer[];
  link: string;
  createdBy: Creator;
  reason?: string
}
export interface TemplateListResponse {
  items: Template[];
  total: number;
  page: number;
  size: number;
}

export interface GetTemplateArgs {
  templateName_contains?: string;
  _page?: number;
  _size?: number;
  _sort?: string;
  status_eq?: number;
  createdBy_eq?: number;
  type_eq?: string;
  typeName_eq?: string;
  department_eq?: string;
  isEnable_eq?: boolean;
  signal?: AbortSignal;
  createdAt_gte?: string; //* gte: Greater than equal
  createdAt_lte?: string //* lte: Lower than equal
  updateAt_gte?: string; //* gte: Greater than equal
  updateAt_lte?: string //* lte: Lower than equal
}

export interface TemplateArgs {
  templateName?: string;
  signatoryList?: number[];
  idTemplateType?: number;
  idDepartment?: number,
  description?: string;
  size?: number;
  createdBy?: number;
}

export interface AddNewTemplateArgs extends TemplateArgs {
  link?: string;
}

export interface AddNewTemplateResponse {
  message: string;
}

export interface AddTemplateToFirebaseArgs {
  templateInfo: TemplateArgs;
  storageRef: StorageReference;
  file: File;
}

export interface TemplateType {
  id: number;
  typeName: string;
}
export interface GetTemplateTypeListResponse {
  items: TemplateType[];
}

export interface EnableTemplateArgs {
  id: number;
  isEnable: boolean;
}

export interface EnableTemplateResponse {
  message: string;
}


export interface ApproveTemplateArgs {
  userId: number;
  templateId: number;
  statusTemplate: StatusTemplate;
  reason?: string;
}

export interface ApproveTemplateResponse {
  message: string;
}
