export interface LoginResponse {
  token: string | undefined;
}

export interface LoginArgument {
  username: string | undefined;
  password: string | undefined;
}

export interface UserInfo {
  userId: number;
  role_name: string;
  nbf: string;
  iat: number;
  exp: number;
}
