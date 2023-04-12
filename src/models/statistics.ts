export interface GetStatisticsDocumentResponse{
    departmentId: number,
    departmentName: string,
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}
export interface GetStatisticsTemplateResponse{
    departmentId: number,
    departmentName: string,
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}
export interface GetStatisticsDocumentOfUserResponse{
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}
export interface GetStatisticsIncomingDocumentResponse{
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}

export interface StatisticsDocument{
    departmentId: number,
    departmentName: string,
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}
export interface StatisticsTemplate{
    departmentId: number,
    departmentName: string,
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}