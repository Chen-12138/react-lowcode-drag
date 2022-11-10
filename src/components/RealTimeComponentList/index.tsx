import { useSelector } from "react-redux";
import { State } from "../../state/reducer";
import styles from "./index.less";

const RealTimeComponentList = function () {
  const editorConfig = useSelector((state: State) => state.editor);

  return (
    <div className={styles["real-time-component-list"]}>
      {editorConfig.componentData.map((item) => {
        return (
          <div className={styles[".real-time-component-item"]} key={item.id}>
            test
          </div>
        );
      })}
    </div>
  );
};

export default RealTimeComponentList;
