import React, { useState } from "react";
import { message, Form, Button, Input } from "antd";
import styles from "./index.less";

const Login = (props: {
  history?: { push: (arg0: string) => void; replace: (arg0: string) => void };
}) => {
  const [type, setType] = useState<"login" | "register">("login");

  const handleChangeType = () => {
    if (type === "login") {
      setType("register");
    } else {
      setType("login");
    }
  };

  return (
    <>
      <div className={styles["page-login"]}>
        <div className={styles["login-page-inner"]}>
          <p className={styles["title"]}>Lucky H5</p>
          <Form autoComplete="off">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="用户名" />
            </Form.Item>
            {type === "register" && (
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="邮箱" />
              </Form.Item>
            )}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                {type === "login" ? "登录" : "注册"}
              </Button>
            </Form.Item>
          </Form>
          <div className={styles["switch-do-type"]} onClick={handleChangeType}>
            <p>{type === "login" ? "马上注册" : "马上登录"}</p>
          </div>
          <p className={styles["login-page-bottom"]}>
            Copyright © 2022 <span className="primary">Lucky H5版权所有</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
