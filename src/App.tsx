import Toolbar from "./components/Toolbar";
import styles from "./App.less";
import ComponentList from "./components/ComponentList";
import RealTimeComponentList from "./components/RealTimeComponentList";
import { Tabs } from "antd";
import CanvasAttr from "./components/CanvasAttr";
import Editor from "./components/Editor";
import { State } from "./state/reducer";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import componentList from "./custom-component/component-list";
import useAction from "./hook/useAction";
import TextAttr from "./custom-component/Text/TextAttr";
import ButtonAttr from "./custom-component/Button/ButtonAttr";
import RectAttr from "./custom-component/Rect/RectAttr";

function App() {
  const editorConfig = useSelector((state: State) => state.editor);
  const {
    addComponent,
    recordSnapShot,
    setCurComponent,
    setClickComponentStatus,
  } = useAction();

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const index = e.dataTransfer.getData("index");
    const rectInfo = editorConfig.editor.getBoundingClientRect();
    if (index) {
      const component = cloneDeep(componentList[index]);
      component.style.top = e.clientY - rectInfo.y;
      component.style.left = e.clientX - rectInfo.x;
      component.id = Math.random();

      addComponent(component);
      recordSnapShot(component);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleMouseUp = (e: any) => {
    if (!editorConfig.isClickComponent) {
      setCurComponent({ curComponent: null, curComponentIndex: null });
    }
  };

  const handleMouseDown = (e: any) => {
    e.stopPropagation();
    setClickComponentStatus(false);
  };

  const getAttrComponent = (type: string) => {
    switch (type) {
      case "Text": {
        return <TextAttr />;
      }

      case "Button": {
        return <ButtonAttr />;
      }

      case "Rect": {
        return <RectAttr />;
      }
    }
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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <Editor />
          </div>
        </section>
        {/* 右侧属性列表 */}
        <section className={styles.right}>
          {editorConfig.curComponent ? (
            <Tabs
              defaultActiveKey="attr"
              items={[
                {
                  label: `属性`,
                  key: "attr",
                  children: getAttrComponent(
                    editorConfig.curComponent.component
                  ),
                },
                {
                  label: `动画`,
                  key: "animation",
                  children: `Content of Tab Pane 2`,
                },
                {
                  label: `事件`,
                  key: "events",
                  children: `Content of Tab Pane 3`,
                },
              ]}
            />
          ) : (
            <CanvasAttr />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
