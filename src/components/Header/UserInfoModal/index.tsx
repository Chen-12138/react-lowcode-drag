import { PlusOutlined } from "@ant-design/icons";
import { Modal, ModalProps, Upload } from "antd";
import styles from "./index.less";

interface UserInfoModalProps extends ModalProps {
  userInfo: any;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  userInfo,
  ...props
}) => {
  return (
    <Modal width={400} footer={null} {...props}>
      <div className={styles["user-info"]}>
        <Upload
          style={{ display: "block", marginBottom: 20 }}
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
          <PlusOutlined />
        </Upload>
        <div className={styles["item"]}>
          <p className={styles["label"]}>昵称：</p>
          {userInfo?.username}
        </div>
        <div className={styles["item"]}>
          <p className={styles["label"]}>用户名：</p>
          {userInfo?.username}
        </div>
        <div className={styles["item"]}>
          <p className={styles["label"]}>邮箱：</p>
          {userInfo?.username}
        </div>
        <div className={styles["item"]}>
          <p className={styles["label"]}>注册时间：</p>
          {userInfo?.username}
        </div>
      </div>
    </Modal>
  );
};

export default UserInfoModal;
