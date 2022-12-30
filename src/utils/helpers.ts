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

// *-------------------------------------------- HANDLE NOTIFICATIONS --------------------------------------------
// export handleNotification = 

const helpers = {
    setToken,
    getToken,
    clearToken
}

export default helpers;


