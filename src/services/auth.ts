import { LoginArgument, LoginResponse } from "./../models/auth";
import { apiPaths, helpers, httpClient } from "../utils";

const login = async (data: LoginArgument): Promise<LoginResponse> => {
  const response = await httpClient.post({
    url: apiPaths.auth.login,
    data,
  });
  const responseData: LoginResponse = response.data;
  helpers.setToken(responseData.token);
  return responseData;
};

export const authServices = {
  login,
};
