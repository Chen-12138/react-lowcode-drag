import { UserActionTypes } from "@/state/constants/userActionType";
import { UserInfo } from "@/state/reducers/user";
import { useDispatch } from "react-redux";

/**
 * 处理用户的Action
 */
export default function useUserAction() {
  const dispatch = useDispatch();

  return {
    updateUserInfo(userInfo?: UserInfo) {
      dispatch({
        type: UserActionTypes.UpdateUserInfo,
        payload: userInfo,
      });
    },

    updateAccessToken(token: string) {
      dispatch({
        type: UserActionTypes.UpdateAccessToken,
        payload: token,
      });
    },

    updateUserFromLocal() {
      dispatch({
        type: UserActionTypes.UpdateUserFromLocal,
      });
    },
  };
}
