export interface Template{
    id: number,
    createdAt: string,
    updatedAt: string,
    templateName: string,
    type: '.pdf',
    size: string,
    statusTemplate: 'Active',
    departmentName: string    
}
export interface TemplateListResponse{
    items: Template[],
    total: number,
    page: number,
    size: number
}



export interface TemplateArgs{
    templateName?: string,
    signatoryList?: number[],
    idTemplateType?: number,
    // idDepartment?: number,
    description?: string,
    size?: number,
}

export interface AddNewTemplateArgs extends TemplateArgs{
    link?: string,
}

export interface AddNewTemplateResponse{
    message: string
}

export interface TemplateType{
    id: number,
    typeName:string
}
export interface GetTemplateTypeListResponse{
    items: TemplateType[]
}