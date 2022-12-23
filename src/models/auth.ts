export interface LoginResponse {
  token: string | undefined;
}

export interface LoginArgument {
  username: string | undefined;
  password: string | undefined;
}

export interface UserInfo {
  userId: number;
  roleName: string;
  nbf: string;
  iat: number;
  exp: number;
  userName:string,
  signature: string,
  idPermissions: number[]
}
