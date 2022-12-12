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
}

export interface UserListResponse{
    items: IUser[]
}

export interface IFile{
    name: string,
    size: number,
    type: string,
}