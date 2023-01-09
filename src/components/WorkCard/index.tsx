import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.less";
import { PlusOutlined } from "@ant-design/icons";
import { ProjectConfig, getProjectConfig } from "@/views/Editor/config";
import { createPage } from "@/api";

interface WorkCardProps {
  config?: ProjectConfig;
}

const WorkCard: React.FC<WorkCardProps> = ({ config }) => {
  const navigate = useNavigate();

  const handleCreate = async () => {
    let newPageData = getProjectConfig();
    const res = await createPage({ ...newPageData });
    const id = res.result._id;
    linkToEdit(id);
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
            <Button className={styles["btn"]} type="link">
              更多...
            </Button>
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
