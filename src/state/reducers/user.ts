import { UserAction, UserActionTypes } from "../constants/userActionType";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { cloneDeep } from "lodash";

export interface UserInfo {
  username: string;
  password: string;
  name: string;
  email: string;
  avatar: string;
}

export interface UserState {
  // token
  access_token: string;
  // 权限相关
  permissionList: Array<any>;
  // 用户信息
  userInfo: UserInfo;
}

export const userInitialState: UserState = {
  access_token: "",
  permissionList: [],
  userInfo: {} as UserInfo,
};

const userReducer = (
  state: UserState = userInitialState,
  action: UserAction
) => {
  switch (action.type) {
    case UserActionTypes.UpdateUserInfo: {
      const userInfo = action.payload as UserInfo;
      state.userInfo = userInfo || {};
      setLocalStorage("user", state);
      return {
        ...state,
      };
    }

    case UserActionTypes.UpdateAccessToken: {
      const token = action.payload as string;
      state.access_token = token;
      setLocalStorage("user", state);
      return {
        ...state,
      };
    }

    case UserActionTypes.UpdateUserFromLocal: {
      let user = getLocalStorage("user");
      if (user) {
        state = cloneDeep(user);
      }
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
