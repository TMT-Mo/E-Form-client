import { ChangePasswordArgument, ChangePasswordResponse, GetSignatureArgs, GetSignatureResponse, LoginArgument, LoginResponse } from "./../models/auth";
import { apiPaths, helpers, httpClient } from "../utils";

const login = async (data: LoginArgument): Promise<LoginResponse | undefined> => {
  const response = await httpClient.post({
    url: apiPaths.auth.login,
    data,
  });
  const responseData: LoginResponse = response.data;
  helpers.setToken(responseData.token!)
  return responseData;
};

const changePassword = async (data: ChangePasswordArgument): Promise<ChangePasswordResponse> => {
  // const response = await httpClient.post({
  //   url: apiPaths.auth.login,
  //   data,
  // });
  // const responseData: ChangePasswordResponse = response.data;
  const responseData: ChangePasswordResponse = {message: 'Change password successfully!'};
  return responseData;
};

const getSignature = async (data: GetSignatureArgs): Promise<GetSignatureResponse> => {
  const response = await httpClient.post({url: apiPaths.auth.getSignature, data})
  return response.data as GetSignatureResponse
}


export const authServices = {
  login,
  getSignature,
  changePassword,
};
