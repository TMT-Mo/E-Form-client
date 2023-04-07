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
  ShareDepartmentsArgs,
  ShareDepartmentsResponse,
  ShareUsersArgs,
  ShareUsersResponse,
  GetSharedDepartmentsArgs,
  GetSharedDepartmentsResponse,
  GetSharedUsersArgs,
  GetSharedUsersResponse,
  GetSharedDocumentArgs,
  GetSharedDocumentResponse,
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
    params: data,
  });
  return response.data as GetDocumentHistoryResponse;
};

const getSharedDocument = async (
  params: GetSharedDocumentArgs
  ): Promise<GetSharedDocumentResponse> => {
  const response = await httpClient.get({
    url: apiPaths.document.getDocuments,
    params,
  });
  return response.data as GetSharedDocumentResponse;
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

const shareDepartments = async (
  data: ShareDepartmentsArgs
): Promise<ShareDepartmentsResponse> => {
  const response = await httpClient.post({
    url: apiPaths.document.shareDepartments,
    data,
  });
  return response.data as ShareDepartmentsResponse;
};
const shareUsers = async (
  data: ShareUsersArgs
): Promise<ShareUsersResponse> => {
  const response = await httpClient.post({
    url: apiPaths.document.shareUsers,
    data,
  });
  return response.data as ShareUsersResponse;
};
const getSharedDepartments = async (
  data: GetSharedDepartmentsArgs
): Promise<GetSharedDepartmentsResponse> => {
  const response = await httpClient.post({
    url: apiPaths.document.getSharedDepartments,
    data,
  });
  return response.data as GetSharedDepartmentsResponse;
};
const getSharedUsers = async (
  data: GetSharedUsersArgs
): Promise<GetSharedUsersResponse> => {
  const response = await httpClient.post({
    url: apiPaths.document.getShareUsers,
    data,
  });
  return response.data as GetSharedUsersResponse;
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
  getSharedDocument,
  lockDocument,
  changeSignerDocument,
  shareDepartments,
  shareUsers,
  getSharedDepartments,
  getSharedUsers
};
