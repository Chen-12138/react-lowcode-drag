import { State } from "@/state/reducer";
import { useSelector } from "react-redux";
import { LoginParam, RegisterParam, login, register } from "@/api";
import useUserAction from "./useUserAction";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect, useState } from "react";

const useUser = () => {
  const { user } = useSelector((state: State) => state);
  const { updateUserFromLocal } = useUserAction();
  const { updateAccessToken, updateUserInfo } = useUserAction();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    updateUserFromLocal();
  }, []);

  useEffect(() => {
    if (user.access_token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

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
    isLogin,
    doLogin,
    doRegister,
    doLogOut,
    goLogin,
    goBeforeLoginUrl,
  };
};

export default useUser;
