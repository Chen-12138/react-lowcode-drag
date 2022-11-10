import Toolbar from "./components/Toolbar";
import styles from "./App.less";
import ComponentList from "./components/ComponentList";
import RealTimeComponentList from "./components/RealTimeComponentList";
import { Tabs } from "antd";
import CanvasAttr from "./components/CanvasAttr";
import Editor from "./components/Editor";
import { State } from "./state/reducer";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import componentList from "./custom-component/component-list";
import { ActionTypes } from "./state/constants/actionTypes";

function App() {
  const editor = useSelector((state: State) => state.editor.editor);
  const dispatch = useDispatch();

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const index = e.dataTransfer.getData("index");
    const rectInfo = editor.getBoundingClientRect();
    if (index) {
      const component = cloneDeep(componentList[index]);
      component.style.top = e.clientY - rectInfo.y;
      component.style.left = e.clientX - rectInfo.x;
      component.id = Math.random();

      console.log(component);

      dispatch({
        type: ActionTypes.AddComponent,
        payload: component,
      });
      dispatch({
        type: ActionTypes.RecordSnapShot,
        payload: component,
      });
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

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
          <div
            className={styles.content}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
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
