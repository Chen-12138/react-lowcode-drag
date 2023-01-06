/**
 * 用户相关api
 */
import $axios from "@/service/httpServer";
import { UserInfo } from "@/state/reducers/user";

export interface LoginParam {
  username: string;
  password: string;
}

interface LoginReturnType {
  access_token: string;
  userInfo: UserInfo;
}

export interface RegisterParam {
  username: string;
  password: string;
  email: string;
}

// 登录
export const login = (params: LoginParam) =>
  $axios.post<LoginReturnType>("/luckyh5/user/login", params);

// 注册
export const register = (params: RegisterParam) =>
  $axios.post<LoginReturnType>("/luckyh5/user/register", params);

// 获取用户信息
export const getUserInfo = (params: any) =>
  $axios.post("/luckyh5/user/info", params);
