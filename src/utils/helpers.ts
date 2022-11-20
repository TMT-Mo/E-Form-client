import { TOKEN_NAME } from "./constants";

// *-------------------------------------------- HANDLE TOKEN --------------------------------------------
const setToken = (tokenValue: string) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(tokenValue));
};

const clearToken = ()=>{
  localStorage.removeItem(TOKEN_NAME)
}

const getToken = (): string => {
  const token = JSON.parse(localStorage.getItem(TOKEN_NAME) as string);
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


