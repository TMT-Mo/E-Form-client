import { apiPaths, httpClient } from '../utils';
import { CreateDocumentArgs, CreateDocumentResponse } from './../models/document';
const createDocument = async (data: CreateDocumentArgs): Promise<CreateDocumentResponse> => {
    const response = await httpClient.post({url: apiPaths.document.createDocument, data})
    return response.data as CreateDocumentResponse
}

export const documentServices = {
    createDocument
}