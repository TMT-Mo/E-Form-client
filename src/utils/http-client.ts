import axios, { Method, AxiosResponse, ResponseType } from "axios";
import { helpers } from "../utils";

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

const axiosConfig = axios.create();
axiosConfig.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(1, config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(2, error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('first')
    console.log(3, response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(4, error);
    return Promise.reject(error);
  }
);

const request = (args: FullOptions): Promise<AxiosResponse> => {
  const {
    url,
    method,
    contentType = "application/json",
    params,
    responseType = "json",
    data,
    // signal,
  } = args;

  // const source = axios.CancelToken.source();
  // if (signal) {
  //   signal.addEventListener("abort", () => {
  //     // source.cancel();
  //   });
  // }
  const token = helpers.getToken();

  return axiosConfig.request({
    url,
    method,
    headers: {
      contentType: contentType,
      Authorization: `Bearer ${token ?? token}`,
    },
    data,
    responseType,
    params,
    // cancelToken: source.token,
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
    return request({ ...args, method: "POST" });
  },
  patch: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "PATCH" });
  },
  delete: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "DELETE" });
  },
};

export default httpClient;
