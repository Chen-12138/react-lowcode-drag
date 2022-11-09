import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import styles from "./App.less";
import ComponentList from "./components/ComponentList";
import RealTimeComponentList from "./components/RealTimeComponentList";
import { Tabs } from "antd";
import CanvasAttr from "./components/CanvasAttr";
import Editor from "./components/Editor";

function App() {
  return (
    <div className={styles.home}>
      <Toolbar />
      <main>
        {/* 左侧组件列表 */}
        <section className={styles.left}>
          <ComponentList />
          <RealTimeComponentList />
        </section>
        {/* 中间画布 */}
        <section className={styles.center}>
          <div className={styles.content}>
            <Editor />
          </div>
        </section>
        {/* 右侧属性列表 */}
        <section className={styles.right}>
          {/* <Tabs
          defaultActiveKey="attr"
          items={[
            {
              label: `属性`,
              key: 'attr',
              children: `Content of Tab Pane 1`,
            },
            {
              label: `动画`,
              key: 'animation',
              children: `Content of Tab Pane 2`,
            },
            {
              label: `事件`,
              key: 'events',
              children: `Content of Tab Pane 3`,
            },
          ]}
        /> */}
          <CanvasAttr />
        </section>
      </main>
    </div>
  );
}

export default App;
