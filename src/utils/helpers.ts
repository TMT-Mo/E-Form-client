import { TOKEN_NAME } from "./constants";

// *-------------------------------------------- HANDLE TOKEN --------------------------------------------
const setToken = (tokenValue: string) => {
  sessionStorage.setItem(TOKEN_NAME, JSON.stringify(tokenValue));
};

const clearToken = ()=>{
  sessionStorage.removeItem(TOKEN_NAME)
}

const getToken = (): string => {
  const token = sessionStorage.getItem(TOKEN_NAME) as string;
  return token;
};

// *-------------------------------------------- HANDLE TIME  --------------------------------------------
const addHours = (date: Date, hours: number):string => {
  // 👇 Make copy with "Date" constructor.
  const dateCopy = new Date(date);

  dateCopy.setHours(dateCopy.getHours() + hours);

  return dateCopy.toLocaleString();
}
// *-------------------------------------------- HANDLE NOTIFICATIONS --------------------------------------------
// export handleNotification = 

const helpers = {
    setToken,
    getToken,
    clearToken,
    addHours
}

export default helpers;


