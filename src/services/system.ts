import { GetTemplateTypeListResponse } from "models/template";
import { httpClient, apiPaths } from "utils";
import {
  DepartmentListResponse,
  GetUsersResponse,
  GetUsersArgs,
  CreateAccountArgs,
  CreateAccountResponse,
  GetPermissionListResponse,
  GetRoleListResponse,
  EditAccountArgs,
  EditAccountResponse,
  CreateDepartmentArgs,
  CreateDepartmentResponse,
  CreateRoleArgs,
  CreateRoleResponse,
  EditDepartmentArgs,
  EditDepartmentResponse,
  EditRoleArgs,
  EditRoleResponse,
} from "models/system";

const getDepartmentList = async (): Promise<DepartmentListResponse[]> => {
  const response = await httpClient.get({
    url: apiPaths.system.getDepartmentList,
  });
  return response.data as DepartmentListResponse[];
};

const getUserList = async (arg: GetUsersArgs): Promise<GetUsersResponse> => {
  const response = await httpClient.get({ url: apiPaths.system.getUserList, params: arg });
  return response.data as GetUsersResponse;
  // const response = DummyUserList
  // return response as unknown as GetUsersResponse
};

const getSigner = async (
  args: GetUsersArgs | undefined
): Promise<GetUsersResponse> => {
  const response = await httpClient.get({
    url: `${apiPaths.system.getSigner}`,
    params: args,
  });
  return response.data as GetUsersResponse;
};

const createAccount = async (
  data: CreateAccountArgs
): Promise<CreateAccountResponse> => {
  const response = await httpClient.post({
    url: `${apiPaths.system.createAccount}`,
    data,
  });
  return response.data as CreateAccountResponse;
};

const editAccount = async (
  data: EditAccountArgs
): Promise<EditAccountResponse> => {
  const response = await httpClient.patch({
    url: `${apiPaths.system.editAccount}`,
    data,
  });
  return response.data as EditAccountResponse;
};

const createRole = async (
  data: CreateRoleArgs
): Promise<CreateRoleResponse> => {
  const response = await httpClient.post({
    url: `${apiPaths.system.createRole}`,
    data,
  });
  return response.data as CreateRoleResponse;
};

const editRole = async (data: EditRoleArgs): Promise<EditRoleResponse> => {
  const response = await httpClient.patch({
    url: `${apiPaths.system.editRole}`,
    data,
  });
  return response.data as EditRoleResponse;
};

const createDepartment = async (
  data: CreateDepartmentArgs
): Promise<CreateDepartmentResponse> => {
  const response = await httpClient.post({
    url: `${apiPaths.system.createDepartment}`,
    data,
  });
  return response.data as CreateDepartmentResponse;
};

const editDepartment = async (
  data: EditDepartmentArgs
): Promise<EditDepartmentResponse> => {
  const response = await httpClient.patch({
    url: `${apiPaths.system.editDepartment}`,
    data,
  });
  return response.data as EditDepartmentResponse;
};

const getTemplateTypeList = async (): Promise<GetTemplateTypeListResponse> => {
  const response = await httpClient.get({
    url: `${apiPaths.system.getTemplateTypeList}`,
  });
  return response.data as GetTemplateTypeListResponse;
};

const getPermissionList = async (): Promise<GetPermissionListResponse> => {
  const response = await httpClient.get({
    url: `${apiPaths.system.getPermissionList}`,
  });
  return response.data as GetPermissionListResponse;
};

const getRoleList = async (): Promise<GetRoleListResponse[]> => {
  const response = await httpClient.get({
    url: `${apiPaths.system.getRoleList}`,
  });
  return response.data as GetRoleListResponse[];
};

export const systemServices = {
  getDepartmentList,
  getUserList,
  getTemplateTypeList,
  getSigner,
  createAccount,
  getPermissionList,
  getRoleList,
  editAccount,
  createDepartment,
  createRole,
  editDepartment,
  editRole,
};
