import { GetTemplateTypeListResponse } from './../models/template';
import { httpClient, apiPaths } from '../utils';
import { DepartmentListResponse, GetUsersResponse, GetUsersArgs } from './../models/system';

const getDepartmentList = async (): Promise<DepartmentListResponse> => {
    const response = await httpClient.get({url: apiPaths.system.getDepartmentList})
    return response.data as DepartmentListResponse
}

// const getUsers = async (args: GetUsersArgs | undefined): Promise<GetUsersResponse> => {
//     const response = await httpClient.get({url: `${apiPaths.system.getUsers}`, params: args})
//     return response.data as GetUsersResponse
// }

const getSigner = async (args: GetUsersArgs | undefined): Promise<GetUsersResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getSigner}`, params: args})
    return response.data as GetUsersResponse
}

const getTemplateTypeList = async (): Promise<GetTemplateTypeListResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getTemplateTypeList}`})
    return response.data as GetTemplateTypeListResponse
}

export const systemServices =  {
    getDepartmentList,
    // getUsers,
    getTemplateTypeList,
    getSigner
}