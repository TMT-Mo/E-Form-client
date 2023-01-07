import { DeviceType, DeviceWidth, TOKEN_NAME } from "./constants";

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
const addHours = (date: Date, hours: number): string => {
  // 👇 Make copy with "Date" constructor.
  const dateCopy = new Date(date);

  dateCopy.setHours(dateCopy.getHours() + hours);

  return dateCopy.toLocaleString();
};

// *-------------------------------------------- HANDLE MUI  --------------------------------------------
const { MOBILE, LAPTOP, IPAD } = DeviceType;
const {MOBILE_WIDTH, LAPTOP_WIDTH, IPAD_WIDTH} = DeviceWidth
const checkHideColumn = (hideDevice: DeviceType ) => {
  let result: boolean
  const { innerWidth } = window;
  

  switch (hideDevice) {
    case MOBILE: {
      innerWidth <= MOBILE_WIDTH ? result = false : result = true;
      break;
    }
    case IPAD: {
      innerWidth <= IPAD_WIDTH ? result = false : result = true;
      break;
    }
    default: result = true
  }
  return result
};
// *-------------------------------------------- HANDLE NOTIFICATIONS --------------------------------------------
// export handleNotification =

const helpers = {
  setToken,
  getToken,
  clearToken,
  addHours,
  checkHideColumn
};

export default helpers;
