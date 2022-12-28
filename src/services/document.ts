import { apiPaths, httpClient } from '../utils';
import { CreateDocumentArgs, CreateDocumentResponse, DocumentListResponse, GetDocumentsArgs } from './../models/document';

const createDocument = async (data: CreateDocumentArgs): Promise<CreateDocumentResponse> => {
    const response = await httpClient.post({url: apiPaths.document.createDocument, data})
    return response.data as CreateDocumentResponse
}

const getDocuments = async (args: GetDocumentsArgs): Promise<DocumentListResponse> => {
    const response = await httpClient.get({url: apiPaths.document.getDocuments, params: args})
    return response.data as DocumentListResponse
}

export const documentServices = {
    createDocument,
    getDocuments
}