import { StorageReference } from 'firebase/storage';
export interface Template{
    id: number,
    createdAt: string,
    updatedAt: string,
    templateName: string,
    type: string,
    description: string,
    size: number,
    status: number,
    typeName: string,
    departmentName: string,
    isEnable: boolean,
    signatoryList: number[],
    link: string,
    createdBy: number
}
export interface TemplateListResponse{
    items: Template[],
    total: number,
    page: number,
    size: number
}

export interface GetTemplateArgs{
    templateName_contains?: string,
    _page?: number,
    _size?:number,
    _sort?: string,
    status_eq?: number,
    createdBy_eq?: number,
}

export interface TemplateArgs{
    templateName?: string,
    signatoryList?: number[],
    idTemplateType?: number,
    // idDepartment?: number,
    description?: string,
    size?: number,
    createdBy?: number,
}

export interface AddNewTemplateArgs extends TemplateArgs{
    link?: string,
}

export interface AddNewTemplateResponse{
    message: string
}

export interface AddTemplateToFirebaseArgs{
    templateInfo: TemplateArgs,
    storageRef: StorageReference
    file: File
  }

export interface TemplateType{
    id: number,
    typeName:string
}
export interface GetTemplateTypeListResponse{
    items: TemplateType[]
}