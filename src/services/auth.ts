import { apiPaths } from './../utils/api-paths';
import { httpClient } from '../hooks';
import { LoginArgument, LoginResponse } from './../models/auth';
 

const getToken = async (args: LoginArgument): Promise<LoginResponse> =>{
    const response = await httpClient.post({url: apiPaths.auth.login, data: args})
    return response.data as LoginResponse;
}   

export const authServices = {
    getToken,
}