import { ComponentListItem } from "@/custom-component/component-list";
import { AnimationItem } from "@/utils/animationClassData";
import { CanvasStyleData } from "../reducers/editor";
import { UserInfo } from "../reducers/user";

export enum UserActionTypes {
  // 将user信息存在localStorage
  SaveUserToLocal = "SaveUserToLocal",
  // 更新用户信息
  UpdateUserInfo = "UpdateUserInfo",
  // 从localStorage取出数据更新user
  UpdateUserFromLocal = "UpdateUserFromLocal",
  // 更新token
  UpdateAccessToken = "UpdateAccessToken",
  // 更新个人权限相关
  UpdateUserPermission = "UpdateUserPermission",
}

export interface UserAction {
  type: UserActionTypes;
  payload: boolean | number | string | UserInfo;
}
