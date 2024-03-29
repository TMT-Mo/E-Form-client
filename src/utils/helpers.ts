import { UserInfo } from "models/auth";
import jwtDecode from "jwt-decode";
import {
  DeviceType,
  DeviceWidth,
  MYSTERIOUS_KEY,
  Permissions,
  SessionStorage,
} from "./constants";
import { Dayjs } from "dayjs";
import CryptoJS from "crypto-js";
const { TOKEN_NAME, LOCATION } = SessionStorage;

// *-------------------------------------------- HANDLE AUTHENTICATE --------------------------------------------
const setToken = (tokenValue: string) => {
  sessionStorage.setItem(TOKEN_NAME, JSON.stringify(tokenValue));
};

const clearToken = () => {
  sessionStorage.removeItem(TOKEN_NAME);
  sessionStorage.removeItem(LOCATION);
};

const getToken = (): string => {
  const token = sessionStorage
    .getItem(TOKEN_NAME)
    ?.replace(/(['"])/g, "") as string;
  return token;
};

const getLocation = (): number => {
  const location = sessionStorage.getItem(LOCATION)!;
  return +location;
};

// *-------------------------------------------- HANDLE TIME  --------------------------------------------
const addHours = (date: string | null, hours: number = 7): string => {
  // 👇 Make copy with "Date" constructor.
  if (!date) return "---";
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
  const permissions = getToken()
    ? (jwtDecode(getToken()) as UserInfo)?.idPermissions
        .split(",")
        .map((id) => +id)
    : undefined;
  return permissions?.includes(permission!);
};

// *-------------------------------------------- HANDLE DAYJS --------------------------------------------
const handleFormatDateJS = (date: Dayjs | undefined) =>{
  // console.log(date)
  return date?.toDate()};

// *-------------------------------------------- HANDLE NOTIFICATIONS --------------------------------------------
// export handleNotification =

// *-------------------------------------------- HANDLE PERCENTAGE VALUE --------------------------------------------
const handlePercentageValue = (value: number, total: number): string => {
  const percent = Math.floor((value / total) * 100);
  if (isNaN(percent)) {
    return "";
  }
  return `(${percent}%)`;
};

// *-------------------------------------------- HANDLE PASSWORD --------------------------------------------
const encryptData = (input: string) => {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(input),
    MYSTERIOUS_KEY
  ).toString();
  sessionStorage.setItem("Unknown", data);
};

const decryptData = () => {
  const encryptedData = sessionStorage.getItem("Unknown")!;
  const bytes = CryptoJS.AES.decrypt(encryptedData, MYSTERIOUS_KEY);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

const helpers = {
  setToken,
  getToken,
  clearToken,
  addHours,
  checkHideColumnFromDevice,
  checkHideColumnFromPermission,
  getLocation,
  handleFormatDateJS,
  handlePercentageValue,
  encryptData,
  decryptData,
};

export default helpers;
