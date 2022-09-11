import { TOKEN_NAME } from "./constants";

export const setToken = (tokenValue: string) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(tokenValue));
};

export const getToken = (): string => {
  const token = JSON.parse(localStorage.getItem(TOKEN_NAME) as string);
  return token;
};
