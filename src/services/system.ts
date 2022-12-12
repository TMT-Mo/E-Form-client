import { GetTemplateTypeListResponse } from './../models/template';
import { httpClient, apiPaths } from '../utils';
import { DepartmentListResponse, UserListResponse } from './../models/system';

const getDepartmentList = async (): Promise<DepartmentListResponse> => {
    const response = await httpClient.get({url: apiPaths.system.getDepartmentList})
    return response.data as DepartmentListResponse
}

const getUserListByDepartmentID = async (departmentID: number): Promise<UserListResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getUserListByDepartmentID}${departmentID}`})
    return response.data as UserListResponse
}

const getTemplateTypeList = async (): Promise<GetTemplateTypeListResponse> => {
    const response = await httpClient.get({url: `${apiPaths.system.getTemplateTypeList}`})
    return response.data as GetTemplateTypeListResponse
}

export const systemServices =  {
    getDepartmentList,
    getUserListByDepartmentID,
    getTemplateTypeList
}