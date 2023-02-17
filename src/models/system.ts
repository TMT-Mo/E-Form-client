export interface Department{
    id: number,
    departmentName: string
}

export interface DepartmentListResponse{
    items: readonly Department[]
}

export interface IUser{
    id: number,
    username: string,
    signature: string,
    roleName: string,
    status: number,
    createdAt: string,
    updateAt: string
    departmentName: string
}

export interface GetUsersResponse{
    items: IUser[],
    total: number,
    page: number,
    size: number
}

export interface GetUsersArgs{
    departmentId_eq?: number,
    id_eq?: number
}

export interface IFile{
    name: string,
    size: number,
    type: string,
}

// export interface PermissionList{

// }