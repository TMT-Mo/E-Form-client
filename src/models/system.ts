export interface Department {
  id: number;
  departmentName: string;
}

export interface DepartmentListResponse {
  id: number;
  departmentName: string;

  // items: Department[];
}

export interface IUser {
  id: number;
  userName: string;
  signature: string;
  roleName: string;
  status: number;
  createdAt: string;
  updateAt: string;
  departmentName: string;
  idPermissions: number[];
  firstName: string;
  lastName: string;
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

export interface CreateAccountArgs {
  userName?: string;
  password?: string;
  idPermissions: number[];
  idDepartment?: number;
  idRole?: number;
  signature?: string;
  firstName?: string,
  lastName?: string,
  status: boolean
}

export interface CreateAccountResponse {
  message: string;
}
export interface EditAccountArgs {
  idUser?: number,
  userName?: string;
  password?: string;
  idPermissions: number[];
  idDepartment?: number;
  idRole?: number;
  signature?: string;
  firstName?: string,
  lastName?: string,
  status: boolean
}

export interface EditAccountResponse {
  message: string;
}

export interface GetPermissionListArgs {}

export interface GetRoleListArgs {
  idDepartment: number;
}

export interface Role {
  id: number;
  roleName: string;
}
export interface GetRoleListResponse {
  id: number;
  roleName: string;
  // items: Role[];
  // total: number;
  // page: number;
  // size: number;
}

export interface Permission {
  id: number;
  permissionName: string;
}
export interface GetPermissionListResponse {
  permissionList: Permission[];
}
export interface CreateRoleArgs {
  roleName: string
}
export interface CreateRoleResponse {
  message: string
}
export interface EditRoleArgs {
  roleName: string,
  roleId: number
}
export interface EditRoleResponse {
  message: string
}
export interface CreateDepartmentArgs {
  departmentName: string
}
export interface CreateDepartmentResponse {
  message: string
}
export interface EditDepartmentArgs {
  departmentName: string,
  departmentId: number
}
export interface EditDepartmentResponse {
  message: string
}



