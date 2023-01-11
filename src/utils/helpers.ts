import { UserInfo } from "./../models/auth";
import jwtDecode from "jwt-decode";
import { DeviceType, DeviceWidth, Permissions, TOKEN_NAME } from "./constants";

// *-------------------------------------------- HANDLE TOKEN --------------------------------------------
const setToken = (tokenValue: string) => {
  sessionStorage.setItem(TOKEN_NAME, JSON.stringify(tokenValue));
};

const clearToken = () => {
  sessionStorage.removeItem(TOKEN_NAME);
};

const getToken = (): string => {
  const token = sessionStorage.getItem(TOKEN_NAME) as string;
  return token;
};

// *-------------------------------------------- HANDLE TIME  --------------------------------------------
const addHours = (date: string | null, hours: number = 7): string => {
  // 👇 Make copy with "Date" constructor.
  if (!date) return '---'
  const dateCopy = new Date(date);

  dateCopy.setHours(dateCopy.getHours() + hours);

  return dateCopy.toLocaleString();
};

// *-------------------------------------------- HANDLE MUI  --------------------------------------------
const { MOBILE, IPAD } = DeviceType;
const { MOBILE_WIDTH, IPAD_WIDTH } = DeviceWidth;
const checkHideColumnFromDevice = (hideDevice: DeviceType) => {
  let result: boolean;
  const { innerWidth } = window;
  switch (hideDevice) {
    case MOBILE: {
      innerWidth <= MOBILE_WIDTH ? (result = false) : (result = true);
      break;
    }
    case IPAD: {
      innerWidth <= IPAD_WIDTH ? (result = false) : (result = true);
      break;
    }
    default:
      result = true;
  }

  return result;
};

const checkHideColumnFromPermission = (permission: Permissions) => {
  const permissions = getToken() ? (jwtDecode(getToken()) as UserInfo)?.idPermissions
    .split(",")
    .map((id) => +id) : undefined;
  return permissions?.includes(permission!) ;
};
// *-------------------------------------------- HANDLE NOTIFICATIONS --------------------------------------------
// export handleNotification =

const helpers = {
  setToken,
  getToken,
  clearToken,
  addHours,
  checkHideColumnFromDevice,
  checkHideColumnFromPermission,
};

export default helpers;
