export interface LoginResponse {
  token: string;
}

export interface LoginArgument {
  username: string;
  password: string;
}

export interface UserInfo {
  username: string;
  role_name: string;
  iat: number;
  exp: number;
}
