import { GetSignatureArgs, GetSignatureResponse, LoginArgument, LoginResponse } from "./../models/auth";
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

const getSignature = async (data: GetSignatureArgs): Promise<GetSignatureResponse> => {
  const response = await httpClient.post({url: apiPaths.auth.getSignature, data})
  return response.data as GetSignatureResponse
}

export const authServices = {
  login,
  getSignature
};
