import { useSelector } from "react-redux";
import useAction from "../../hook/useAction";
import { State } from "../../state/reducer";
import styles from "./index.less";

const RealTimeComponentList = function () {
  const { componentData, curComponentIndex } = useSelector(
    (state: State) => state.editor
  );

  const { setCurComponent, deleteComponent, upComponent, downComponent } =
    useAction();

  // 越往后层级越高，所以应该从后往前展示
  const transformIndex = (index: number) => {
    return componentData.length - 1 - index;
  };

  const getCompoent = (index: number) => {
    return componentData[componentData.length - 1 - index];
  };

  const handleUpComponent = () => {
    setTimeout(() => {
      upComponent();
    });
  };

  const handleDownComponent = () => {
    setTimeout(() => {
      downComponent();
    });
  };

  const handleClick = (index: number) => {
    setCurComponent({
      curComponent: componentData[index],
      curComponentIndex: index,
    });
  };

  return (
    <div className={styles["real-time-component-list"]}>
      {componentData.map((item, index) => {
        return (
          <div
            className={`${styles["real-time-component-item"]} ${
              transformIndex(index) === curComponentIndex ? styles.actived : ""
            }`}
            key={item.id}
            onClick={() => handleClick(transformIndex(index))}
          >
            <span
              className={`iconfont ${"icon-" + getCompoent(index).icon} ${
                styles.icon
              }`}
            ></span>
            <span>{getCompoent(index).label}</span>
            <div className={styles["icon-container"]}>
              <span
                className={`iconfont icon-shangyi ${styles.icon}`}
                onClick={handleUpComponent}
              ></span>
              <span
                className={`iconfont icon-xiayi ${styles.icon}`}
                onClick={handleDownComponent}
              ></span>
              <span
                className={`iconfont icon-shanchu ${styles.icon}`}
                onClick={() => deleteComponent(transformIndex(index))}
              ></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RealTimeComponentList;
