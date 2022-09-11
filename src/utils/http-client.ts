import axios, { Method, AxiosResponse, ResponseType } from "axios";
import {helpers} from "../utils";

interface Options {
  url: string;
  params?: object;
  contentType?: string;
  responseType?: ResponseType;
  data?: object | string;
  signal?: AbortSignal;
  token?: string;
}

interface FullOptions extends Options {
  method: Method;
}
const request = (args: FullOptions): Promise<AxiosResponse> => {
  const {
    url,
    method,
    contentType = "application/json",
    // params,
    responseType = "json",
    data,
    signal,
  } = args;

  const source = axios.CancelToken.source();
  if (signal) {
    signal.addEventListener("abort", () => {
      source.cancel();
    });
  }
  const token = helpers.getToken();

  return axios.request({
    url,
    method,
    headers: {
      contentType: contentType,
      Authorization: `Bearer ${token ?? token}`,
    },
    data,
    responseType,
    cancelToken: source.token,
  });
};

const httpClient = {
  get: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "GET" });
  },
  put: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "PUT" });
  },
  post: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "post" });
  },
  patch: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "PATCH" });
  },
  delete: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "DELETE" });
  },
};

export default httpClient;
