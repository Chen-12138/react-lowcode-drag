import {
  EditOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfoModal from "../UserInfoModal";

const UserBtn = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("user"));
  const [user, setUser] = useState<any>();
  const [showUserModal, setShowUserModal] = useState(false);

  const handleLoginOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "");
    setUser(userInfo);
  }, []);

  const items = [
    {
      label: (
        <div onClick={() => setShowUserModal(true)}>
          <UserOutlined /> 个人资料
        </div>
      ),
      key: "item-1",
    },
    {
      label: (
        <div>
          <EditOutlined /> 修改密码
        </div>
      ),
      key: "item-2",
    },
    {
      label: (
        <div onClick={handleLoginOut}>
          <PoweroffOutlined /> 退出登录
        </div>
      ),
      key: "item-3",
    },
  ];

  return (
    <>
      {isLogin ? (
        <Dropdown menu={{ items }}>
          <div style={{ whiteSpace: "nowrap" }}>
            <Avatar icon={<UserOutlined />} /> {user?.username}
          </div>
        </Dropdown>
      ) : (
        <Button type="link">登录</Button>
      )}
      <UserInfoModal
        userInfo={user}
        open={showUserModal}
        onCancel={() => setShowUserModal(false)}
      />
    </>
  );
};

export default UserBtn;
