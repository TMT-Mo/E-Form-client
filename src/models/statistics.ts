
export interface StatisticsDocument{
    departmentId: number,
    departmentName: string,
    total: number,
    processing: number,
    approved: number,
    rejected: number
}
export interface StatisticsTemplate{
    departmentId: number,
    departmentName: string,
    total: number,
    processing: number,
    approved: number,
    rejected: number
}

export interface GetStatisticsDocument{
    departmentId?: number,
    fromDate?: string,
    toDate?: string,
}
export interface GetStatisticsTemplate{
    departmentId?: number,
    fromDate?: string,
    toDate?: string,
}
export interface GetStatisticsDocumentList{
    fromDate?: string,
    toDate?: string,
}
export interface GetStatisticsTemplateList{
    fromDate?: string,
    toDate?: string,
}

export interface ArrangedStatistics{
    approvedList: number[],
    rejectedList: number[],
    processingList: number[],
    labels: string[]
}
