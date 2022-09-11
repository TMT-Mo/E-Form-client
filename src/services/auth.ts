import { setToken } from './../utils/token';
import { LoginArgument, LoginResponse } from "./../models/auth";
import { apiPaths, httpClient } from "../utils";

const login = async (data: LoginArgument): Promise<LoginResponse> => {
  const response = await httpClient.post({
    url: apiPaths.auth.login,
    data,
  });
  const responseData: LoginResponse = response.data;
  setToken(responseData.token);
  return responseData;
};

export const authServices = {
  login,
};
