import store from "store/index";
import axios, { Method, AxiosResponse, ResponseType, AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { UserInfo } from "models/auth";
import { helpers } from "utils";
import { handleSuccess } from "slices/alert";

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
    // const cancelToken = axios.CancelToken.source()
    // cancelToken.cancel()
    // console.log(cancelToken)
    // Do something before request is sent
    // const token = helpers.getToken()
    // const user = jwtDecode(token) as UserInfo;
    // if (user.exp * 1000 < Date.now()) {
    //   //* Check if token has been expired
    //   console.log('expired')
    //   return;
    // }
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
    
    // store.dispatch(handleSuccess({ message: 'success' }))
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('first')
    // console.log(3, response);
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(4, error);
    if (error.response?.status === 401) {
      helpers.clearToken();
      !window.location.toString().includes('login') && window.location.replace("/login");
    }
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
