export interface Department{
    id: number,
    departmentName: string
}

export interface DepartmentListResponse{
    items: readonly Department[]
}

export interface IUser{
    id: number,
    email: string,
    signature: string,
    roleName: string,
    status: number,
    createdAt: string,
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