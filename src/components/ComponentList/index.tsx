import styles from "./index.less";
import componentList from "@/custom-component/component-list";

const ComponentList = function () {
  const handleDragStart = function (e: any) {
    e.dataTransfer.setData("index", e.target.dataset.index);
  };

  return (
    <div className={styles["component-list"]} onDragStart={handleDragStart}>
      {componentList.map((item, index) => {
        return (
          <div
            className={styles["component-item"]}
            key={index}
            draggable
            data-index={index}
          >
            <span className={`iconfont icon-${item.icon}`}></span>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentList;
