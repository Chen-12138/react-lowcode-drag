import { Button, Space, Drawer, Tabs, Tag } from "antd";
import { useState } from "react";
import animationClassData, {
  AnimationItem,
} from "../../utils/animationClassData";
import styles from "./index.less";
import runAnimation from "../../utils/runAnimation";
import React from "react";
import useAnimationAction from "../../hook/useAnimationAction";
import { useSelector } from "react-redux";
import { State } from "../../state/reducer";
import AnimationSettingModal from "./AnimationSettingModal";
import { SettingOutlined } from "@ant-design/icons";

const AnimationList = () => {
  const { curComponent } = useSelector((state: State) => state.editor);
  const { addAnimation, deleteAnimation } = useAnimationAction();
  const [showDrawer, setShowDrawer] = useState(false);
  const refs: { [x: string]: React.RefObject<HTMLDivElement> } = {};
  const [showSetting, setShowSetting] = useState(false);
  const [animationConfig, setAnimationConfig] = useState<AnimationItem>();
  const [curIndex, setCurIndex] = useState<number>(0);

  const tabConfig = animationClassData.map((item) => {
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
            onClick={() => handleAddAnimation(animate)}
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

  const handleAddAnimation = (animate: AnimationItem) => {
    addAnimation(animate);
    setShowDrawer(false);
  };

  const previewAnimation = () => {
    if (curComponent) {
      curComponent.events["animation"]();
    }
  };

  return (
    <div className={styles["animation-list"]}>
      <div className={styles["div-animation"]}>
        <Space>
          <Button onClick={() => setShowDrawer(true)}>添加动画</Button>
          <Button onClick={previewAnimation}>预览动画</Button>
        </Space>
        <div>
          {curComponent &&
            curComponent.animations.map(
              (animate: AnimationItem, index: number) => {
                return (
                  <Tag
                    className={styles["tag-item"]}
                    key={index}
                    color="blue"
                    icon={
                      <SettingOutlined
                        onClick={() => {
                          setShowSetting(true);
                          setAnimationConfig(animate);
                          setCurIndex(index);
                        }}
                      />
                    }
                    closable
                    onClose={() => {
                      setCurIndex(index);
                      deleteAnimation(index);
                    }}
                  >
                    {animate.label}
                  </Tag>
                );
              }
            )}
        </div>
      </div>

      <Drawer
        width={420}
        headerStyle={{ display: "none" }}
        bodyStyle={{ paddingTop: 0, paddingRight: 0 }}
        placement="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <Tabs items={tabConfig} />
      </Drawer>

      <AnimationSettingModal
        config={animationConfig}
        curIndex={curIndex}
        open={showSetting}
        onCancel={() => setShowSetting(false)}
      />
    </div>
  );
};

export default AnimationList;
