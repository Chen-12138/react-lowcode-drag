import { State } from "@/state/reducer";
import { useSelector } from "react-redux";
import { LoginParam, RegisterParam, login, register } from "@/api";
import useUserAction from "./useUserAction";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const useUser = () => {
  const { access_token, userInfo } = useSelector((state: State) => state.user);
  const { updateAccessToken, updateUserInfo } = useUserAction();
  const navigate = useNavigate();
  const location = useLocation();

  const checkLoginState = () => {
    return !!access_token;
  };

  const doLogin = async (data: LoginParam) => {
    try {
      const res = await login(data);
      updateAccessToken(res.result.access_token);
      updateUserInfo(res.result.userInfo);
      message.success(res.msg);
      goBeforeLoginUrl();
    } catch (e: any) {
      message.error(e.msg);
    }
  };

  const doRegister = async (data: RegisterParam) => {
    try {
      const res = await register(data);
      updateAccessToken(res.result.access_token);
      updateUserInfo(res.result.userInfo);
      message.success(res.msg);
      goBeforeLoginUrl();
    } catch (e: any) {
      message.error(e.msg);
    }
  };

  const doLogOut = () => {
    updateAccessToken("");
    updateUserInfo();
    goLogin();
  };

  const goLogin = () => {
    updateAccessToken("");
    navigate("/login", {
      state: {
        from: location.pathname,
      },
    });
  };

  const goBeforeLoginUrl = () => {
    const state = location.state;
    const from = state ? state.from : "/";
    navigate(from);
  };

  return {
    checkLoginState,
    doLogin,
    doRegister,
    doLogOut,
    goLogin,
    goBeforeLoginUrl,
  };
};

export default useUser;
