import { apiPaths, httpClient } from "../utils";
import {
  CreateDocumentArgs,
  CreateDocumentResponse,
  DocumentListResponse,
  GetDocumentsArgs,
  ApproveDocumentArgs,
  ApproveDocumentResponse,
  GetDocumentHistoryResponse,
  GetDocumentHistoryArgs,
  LockDocumentArgs,
  LockDocumentResponse,
  ChangeSignerDocumentArgs,
  ChangeSignerDocumentResponse,
} from "./../models/document";

const createDocument = async (
  data: CreateDocumentArgs
): Promise<CreateDocumentResponse> => {
  const response = await httpClient.post({
    url: apiPaths.document.createDocument,
    data,
  });
  return response.data as CreateDocumentResponse;
};

const getDocuments = async (
  args: GetDocumentsArgs
): Promise<DocumentListResponse> => {
  const response = await httpClient.get({
    url: apiPaths.document.getDocuments,
    params: args,
  });
  return response.data as DocumentListResponse;
};

const getDocumentHistory = async (
  data: GetDocumentHistoryArgs
): Promise<GetDocumentHistoryResponse> => {
  const response = await httpClient.get({
    url: apiPaths.document.getDocumentHistory,
    data,
  });
  return response.data as GetDocumentHistoryResponse;
};

const approveDocument = async (
  data: ApproveDocumentArgs
): Promise<ApproveDocumentResponse> => {
  const response = await httpClient.post({
    url: apiPaths.document.approveDocument,
    data,
  });
  return response.data as ApproveDocumentResponse;
};

const lockDocument = async (
  data: LockDocumentArgs
): Promise<LockDocumentResponse> => {
  const response = await httpClient.patch({
    url: apiPaths.document.lockDocument,
    data,
  });
  return response.data as LockDocumentResponse;
};

const changeSignerDocument = async (
  data: ChangeSignerDocumentArgs
): Promise<ChangeSignerDocumentResponse> => {
  const response = await httpClient.post({
    url: apiPaths.document.changeSigner,
    data,
  });
  return response.data as ChangeSignerDocumentResponse;
};

export const documentServices = {
  createDocument,
  getDocuments,
  approveDocument,
  getDocumentHistory,
  lockDocument,
  changeSignerDocument,
};
