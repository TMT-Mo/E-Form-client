export interface AwaitSigningResponse{
    
}

export interface PersonalDocResponse{
    
}

export interface SharedDocResponse{
    
}

export interface HistoryResponse{
    
}

export interface CreateDocumentArgs{
    idTemplate: number,
    createdBy: number,
    xfdfString: string,
}

export interface CreateDocumentResponse{
    message: string,
}