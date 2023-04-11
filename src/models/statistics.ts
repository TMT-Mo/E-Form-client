export interface GetStatisticsDocumentOfDepartmentResponse{
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}
export interface GetStatisticsTemplateOfDepartmentResponse{
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

export interface Statistics{
    total: number,
    waiting: number,
    approved: number,
    rejected: number
}