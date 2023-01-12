import { Button, Dropdown, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.less";
import {
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  ProjectConfig,
  copyPage,
  getProjectConfig,
} from "@/views/Editor/config";
import { createPage, deletePage } from "@/api";

const { confirm } = Modal;

interface WorkCardProps {
  refresh?: () => void;
  config?: ProjectConfig;
}

const WorkCard: React.FC<WorkCardProps> = ({ refresh, config }) => {
  const navigate = useNavigate();

  const handleCreate = async () => {
    let newPageData = getProjectConfig();
    const res = await createPage({ ...newPageData });
    const id = res.result._id;
    linkToEdit(id);
  };

  const handleDelete = async () => {
    try {
      await deletePage({ id: config?._id });
      message.success("删除项目成功");
      refresh?.();
    } catch {
      message.error("删除项目失败");
    }
  };

  const linkToEdit = (id?: string) => {
    navigate(`/editor/${id}`, {
      replace: false,
    });
  };
  return (
    <>
      {config ? (
        <div className={styles["card"]}>
          <div className={styles["cover"]}>
            <div className={styles["header-mask"]}></div>
            <div className={styles["post-wrapper"]}>
              <img src={config?.coverImage} alt="" />
            </div>
          </div>
          <div className={styles["title"]}>{config?.title}</div>
          <div className={styles["btn-wrapper"]}>
            <Button
              className={styles["btn"]}
              type="link"
              onClick={() => linkToEdit(config?._id)}
            >
              编辑
            </Button>
            <Button className={styles["btn"]} type="link">
              使用模板
            </Button>
            <Dropdown
              placement="topLeft"
              arrow
              menu={{
                items: [
                  {
                    label: <div>复制连接</div>,
                    key: "copy",
                  },
                  {
                    label: <div>设为我的模板</div>,
                    key: "setTemplate",
                  },
                  {
                    label: (
                      <div
                        onClick={() => {
                          confirm({
                            title: "操作提示",
                            icon: <ExclamationCircleFilled />,
                            content: "确认删除页面？删除后，将无法访问此页面。",
                            okText: "确定",
                            cancelText: "取消",
                            onOk() {
                              handleDelete();
                              console.log("OK");
                            },
                            onCancel() {
                              console.log("Cancel");
                            },
                          });
                        }}
                        style={{ color: "#f5596e" }}
                      >
                        <PoweroffOutlined /> 删除
                      </div>
                    ),
                    key: "delete",
                  },
                ],
              }}
            >
              <Button className={styles["btn"]} type="link">
                更多...
              </Button>
            </Dropdown>
          </div>
        </div>
      ) : (
        <div className={`${styles["card"]} ${styles["create"]}`}>
          <div className={styles["temp-create"]} onClick={handleCreate}>
            <PlusOutlined />
            <p style={{ marginTop: 10 }}>新建页面</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkCard;
