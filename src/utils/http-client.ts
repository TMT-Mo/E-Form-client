import { useDispatch } from './../hooks/use-dispatch';
import axios, { Method, AxiosResponse, ResponseType, AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { UserInfo } from "models/auth";
import { helpers } from "utils";

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

const controller = new AbortController();

const axiosConfig = axios.create();
axiosConfig.interceptors.request.use(
  function (config) {
    // const cancelToken = axios.CancelToken.source()
    // cancelToken.cancel()
    // console.log(cancelToken)
    // Do something before request is sent
    const token = helpers.getToken()
    if(!token) return config
    const user = jwtDecode(token) as UserInfo;
    if (user.exp * 1000 < Date.now()) {
      //* Check if token has been expired
      controller.abort()
      helpers.clearToken();
      !window.location.toString().includes('login') && window.location.replace("/login");
      
      return;
    }
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
    // signal
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
    // signal
  });
};

const httpClient = {
  get: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "GET",  signal: controller?.signal });
  },
  put: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "PUT",  signal: controller?.signal });
  },
  post: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "POST",  signal: controller?.signal });
  },
  patch: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "PATCH",  signal: controller?.signal });
  },
  delete: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "DELETE",  signal: controller?.signal });
  },
};

export default httpClient;
