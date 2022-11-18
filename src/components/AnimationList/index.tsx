import { Button, Space, Drawer, Tabs } from "antd";
import { useMemo, useState } from "react";
import animationClassData, {
  AnimationItem,
} from "../../utils/animationClassData";
import styles from "./index.less";
import runAnimation from "../../utils/runAnimation";
import React from "react";

const AnimationList = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const refs: { [x: string]: React.RefObject<HTMLDivElement> } = {};

  const tabConfig = animationClassData.map((item, index) => {
    item.children.forEach((animate) => {
      refs[animate.value] = React.createRef();
    });

    let children = (
      <div className={styles.animateWrap}>
        {item.children.map((animate) => (
          <div
            ref={refs[animate.value]}
            key={animate.value}
            className={styles.animate}
            onMouseEnter={() => handleRunAnimation(animate)}
          >
            <div>{animate.label}</div>
          </div>
        ))}
      </div>
    );
    return {
      label: item.label,
      key: item.label,
      children,
    };
  });

  const handleRunAnimation = async (animate: AnimationItem) => {
    if (animate.pending) return;

    animate.pending = true;
    await runAnimation(refs[animate.value].current, [animate]);

    // 防止无限触发同一元素的动画
    setTimeout(() => {
      animate.pending = false;
    }, 100);
  };

  return (
    <div className={styles["animation-list"]}>
      <div className={styles["div-animation"]}>
        <Space>
          <Button onClick={() => setShowDrawer(true)}>添加动画</Button>
          <Button>预览动画</Button>
        </Space>
      </div>

      <Drawer
        width={420}
        headerStyle={{ display: "none" }}
        bodyStyle={{ paddingTop: 0, paddingRight: 0 }}
        placement="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <Tabs defaultActiveKey="1" items={tabConfig} />
      </Drawer>
    </div>
  );
};

export default AnimationList;
