import { Project } from "@/service/type";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.less";

interface WorkCardProps {
  config: Project;
}

const WorkCard: React.FC<WorkCardProps> = ({ config }) => {
  const navigate = useNavigate();
  const linkToEdit = () => {
    navigate("/editor", {
      replace: false,
      state: {
        id: config.id,
      },
    });
  };
  return (
    <div className={styles["card"]}>
      <div className={styles["cover"]}>
        <div className={styles["header-mask"]}></div>
        <div className={styles["post-wrapper"]}>
          <img src={config.post} alt="" />
        </div>
      </div>
      <div className={styles["title"]}>{config.title}</div>
      <div className={styles["btn-wrapper"]}>
        <Button className={styles["btn"]} type="link" onClick={linkToEdit}>
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
  );
};

export default WorkCard;
