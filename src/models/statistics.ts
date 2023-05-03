
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
    fromDate?: Date,
    toDate?: Date,
}
export interface GetStatisticsTemplate{
    departmentId?: number,
    fromDate?: Date,
    toDate?: Date,
}
export interface GetStatisticsDocumentList{
    fromDate?: Date,
    toDate?: Date,
}
export interface GetStatisticsTemplateList{
    fromDate?: Date,
    toDate?: Date,
}

export interface ArrangedStatistics{
    approvedList: number[],
    rejectedList: number[],
    processingList: number[],
    labels: string[]
}
