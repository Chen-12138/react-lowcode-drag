import { State } from "@/state/reducer";
import { useSelector } from "react-redux";
import { LoginParam, RegisterParam, login, register } from "@/api";
import useUserAction from "./useUserAction";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useUser = () => {
  const { access_token, userInfo } = useSelector((state: State) => state.user);
  const { updateAccessToken, updateUserInfo } = useUserAction();
  const navigate = useNavigate();

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
    // 存当前路径，用于登录完成跳转
    let index = window.location.href.indexOf("#/");
    let url = window.location.href.slice(index + 1);
    window.sessionStorage.setItem("beforeLoginUrl", url);
    updateAccessToken("");
    navigate("/login");
  };

  const goBeforeLoginUrl = () => {
    let url = window.sessionStorage.getItem("beforeLoginUrl");
    if (!url) {
      navigate("/");
    } else {
      navigate(url);
      window.sessionStorage.setItem("beforeLoginUrl", "");
    }
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
