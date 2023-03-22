export interface Department {
  id: number;
  departmentName: string;
}

export interface DepartmentListResponse {
  items: Department[];
}

export interface IUser {
  id: number;
  username: string;
  signature: string;
  roleName: string;
  status: number;
  createdAt: string;
  updateAt: string;
  departmentName: string;
}

export interface GetUsersResponse {
  items: IUser[];
  total: number;
  page: number;
  size: number;
}

export interface GetUsersArgs {
  departmentId_eq?: number;
  id_eq?: number;
  _page?: number;
  _size?: number;
  _sort?: string;
  status_eq?: number;
  createdBy_eq?: number;
  type_eq?: string;
  typeName_eq?: string;
  department_eq?: string;
  isLocked_eq?: boolean;
  createdAt_gte?: string; //* gte: Greater than equal
  createdAt_lte?: string; //* lte: Lower than equal
  updateAt_gte?: string; //* gte: Greater than equal
  updateAt_lte?: string; //* lte: Lower than equal
}

export interface IFile {
  name: string;
  size: number;
  type: string;
}

export interface Account {
  username?: string;
  password?: string;
  idPermissions: number[];
  idDepartment?: number;
  idRole?: number;
  signature?: string;
  isEnable: boolean;
}

export interface CreateAccountArgs {
  account: Account;
}

export interface CreateAccountResponse {
  message: string;
}
export interface EditAccountArgs {
  account: Account;
}

export interface EditAccountResponse {
  message: string;
}

export interface GetPermissionListArgs {}

export interface Permission {
  id: number;
  permissionName: string;
}

export interface Role {
  id: number;
  roleName: string;
}

export interface GetRoleListArgs {
  idDepartment: number;
}

export interface GetRoleListResponse {
  roleList: Role[];
}
export interface GetPermissionListResponse {
  permissionList: Permission[];
}

