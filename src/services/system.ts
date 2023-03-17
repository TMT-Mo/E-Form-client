import { GetTemplateTypeListResponse } from './../models/template';
import { httpClient, apiPaths } from '../utils';
import { DepartmentListResponse, GetUsersResponse, GetUsersArgs } from './../models/system';
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

const getTemplateTypeList = async (): Promise<GetTemplateTypeListResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getTemplateTypeList}`})
    return response.data as GetTemplateTypeListResponse
}

export const systemServices =  {
    getDepartmentList,
    getUserList,
    getTemplateTypeList,
    getSigner
}