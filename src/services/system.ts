import { GetTemplateTypeListResponse } from './../models/template';
import { httpClient, apiPaths } from '../utils';
import { DepartmentListResponse, GetUsersResponse, GetUsersArgs, CreateAccountArgs, CreateAccountResponse, GetPermissionListResponse, GetRoleListResponse, EditAccountArgs, EditAccountResponse } from './../models/system';
import { DummyUserList } from '../utils/dummy-data';

const getDepartmentList = async (): Promise<DepartmentListResponse> => {
    const response = await httpClient.get({url: apiPaths.system.getDepartmentList})
    return response.data as DepartmentListResponse
}

const getUserList = async (arg: GetUsersArgs): Promise<GetUsersResponse> => {
    const response = await httpClient.get({url: apiPaths.system.getUserList})
    return response.data as GetUsersResponse
    // const response = DummyUserList
    // return response as unknown as GetUsersResponse
  }

const getSigner = async (args: GetUsersArgs | undefined): Promise<GetUsersResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getSigner}`, params: args})
    return response.data as GetUsersResponse
}

const createAccount = async (data: CreateAccountArgs): Promise<CreateAccountResponse> => {
    const response = await httpClient.post({url: `${apiPaths.system.createAccount}`, data})
    return response.data as CreateAccountResponse
}

const editAccount = async (data: EditAccountArgs): Promise<EditAccountResponse> => {
    const response = await httpClient.patch({url: `${apiPaths.system.editAccount}`, data})
    return response.data as  EditAccountResponse
}

const getTemplateTypeList = async (): Promise<GetTemplateTypeListResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getTemplateTypeList}`})
    return response.data as GetTemplateTypeListResponse
}

const getPermissionList = async (): Promise<GetPermissionListResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getPermissionList}`})
    return response.data as GetPermissionListResponse
}

const getRoleList = async (): Promise<GetRoleListResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getRoleList}`})
    return response.data as GetRoleListResponse
}

export const systemServices =  {
    getDepartmentList,
    getUserList,
    getTemplateTypeList,
    getSigner,
    createAccount,
    getPermissionList,
    getRoleList,
    editAccount
}