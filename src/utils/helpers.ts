import { TOKEN_NAME } from "./constants";

// *-------------------------------------------- HANDLE TOKEN --------------------------------------------
const setToken = (tokenValue: string) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(tokenValue));
};

const getToken = (): string => {
  const token = JSON.parse(localStorage.getItem(TOKEN_NAME) as string);
  return token;
};

// *-------------------------------------------- HANDLE NOTIFICATIONS --------------------------------------------
// export handleNotification = 

const helpers = {
    setToken,
    getToken
}

export default helpers;


