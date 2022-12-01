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