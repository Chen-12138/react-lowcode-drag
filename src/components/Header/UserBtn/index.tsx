import {
  EditOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import { useState } from "react";
import UserInfoModal from "../UserInfoModal";
import useUser from "@/hook/useUser";
import { useSelector } from "react-redux";
import { State } from "@/state/reducer";

const UserBtn = () => {
  const { userInfo } = useSelector((state: State) => state.user);
  const [showUserModal, setShowUserModal] = useState(false);
  const { isLogin, doLogOut, goLogin } = useUser();

  const handleLoginOut = () => {
    doLogOut();
  };

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
            <Avatar icon={<UserOutlined />} /> {userInfo?.username}
          </div>
        </Dropdown>
      ) : (
        <Button type="link" onClick={goLogin}>
          登录
        </Button>
      )}
      <UserInfoModal
        userInfo={userInfo}
        open={showUserModal}
        onCancel={() => setShowUserModal(false)}
      />
    </>
  );
};

export default UserBtn;
