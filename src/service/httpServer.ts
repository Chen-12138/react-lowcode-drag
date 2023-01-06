import axios, { AxiosHeaders } from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import $config from "@/config/index";
import QS from "qs";
import { Result } from "./type";

// 线上环境配置axios.defaults.baseURL，生产环境则用proxy代理
// if (process.env.NODE_ENV !== "development") {
//   axios.defaults.baseURL = $config.baseURL;
// }
axios.defaults.baseURL = $config.baseURL;
axios.defaults.headers["Content-Type"] = "application/json;charse=UTF-8";
axios.defaults.timeout = 30000; // 超时时间

//请求拦截器
axios.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应拦截器即异常处理
axios.interceptors.response.use(
  (response) => {
    if (response.data.status) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "错误请求";
          break;
        case 401:
          err.message = "未授权，请重新登录";
          //   userModel.goLogin();
          break;
        case 403:
          err.message = "没有访问权限，拒绝访问";
          break;
        case 404:
          err.message = "请求错误,未找到该资源";
          break;
        case 405:
          err.message = "请求方法未允许";
          break;
        case 408:
          err.message = "请求超时";
          break;
        case 500:
          err.message = err.response.data.message;
          break;
        case 501:
          err.message = "网络未实现";
          break;
        case 502:
          err.message = "网络错误";
          break;
        case 503:
          err.message = "服务不可用";
          break;
        case 504:
          err.message = "网络超时";
          break;
        default:
          err.message = `连接错误${err.response.msg}`;
      }
    } else {
      err.message = "连接到服务器失败";
    }
    return Promise.reject(err.response);
  }
);

export default {
  //get请求
  get<T = any>(
    url: string,
    param?: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return axios({
      method: "get",
      url,
      params: param || {},
      ...config,
    } as any);
  },
  //post请求
  post<T = any>(
    url: string,
    param: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return axios({
      method: "post",
      url,
      data: param || {},
      ...config,
    });
  },
  postFormData<T = any>(
    url: string,
    param: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return axios({
      method: "post",
      url,
      ...config,
      headers: {
        ...(config?.headers || ({} as any)),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: QS.stringify(param) || {},
    });
  },
};
