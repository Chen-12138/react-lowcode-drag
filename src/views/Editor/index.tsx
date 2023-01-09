import Toolbar from "@/components/Toolbar";
import styles from "./index.less";
import ComponentList from "@/components/ComponentList";
import RealTimeComponentList from "@/components/RealTimeComponentList";
import { Tabs } from "antd";
import CanvasAttr from "@/components/CanvasAttr";
import Editor from "@/components/Editor";
import { State } from "@/state/reducer";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import componentList from "@/custom-component/component-list";
import useAction from "@/hook/useAction";
import TextAttr from "@/custom-component/Text/TextAttr";
import ButtonAttr from "@/custom-component/Button/ButtonAttr";
import RectAttr from "@/custom-component/Rect/RectAttr";
import CircleAttr from "@/custom-component/Circle/CircleAttr";
import ImageAttr from "@/custom-component/Image/ImageAttr";
import AnimationList from "@/components/AnimationList";
import EventList from "@/components/EventList";
import "animate.css";
import useKeyBoard from "@/hook/useKeyboard";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPageDetail } from "@/api";
import { ProjectConfig } from "./config";
import PageList from "./pageList";

function App() {
  const { editor, isClickComponent, curComponent } = useSelector(
    (state: State) => state.editor
  );
  const {
    addComponent,
    recordSnapshot,
    setCurComponent,
    setClickComponentStatus,
  } = useAction();
  // 监听键盘事件
  useKeyBoard();
  const { id } = useParams();
  const [pageData, setPageData] = useState<ProjectConfig>();

  useEffect(() => {
    async function getDetail() {
      try {
        const res = await getPageDetail(id || "");
        setPageData(res.result);
      } catch (e) {
        console.log(e);
      }
    }
    getDetail();
  }, []);

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

      addComponent(component);
      recordSnapshot();
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const deSelectCurComponent = (e: any) => {
    if (!isClickComponent) {
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

      case "Circle": {
        return <CircleAttr />;
      }

      case "Image": {
        return <ImageAttr />;
      }
    }
  };

  return (
    <div className={styles.home}>
      <Header>
        <Toolbar />
      </Header>

      <main>
        {/* 左侧列表 */}
        <section className={styles.left}>
          <Tabs
            style={{ height: "100%" }}
            tabPosition="left"
            defaultActiveKey="componentList"
            items={[
              {
                label: `组件列表`,
                key: "componentList",
                children: (
                  <div>
                    <ComponentList />
                    <RealTimeComponentList />
                  </div>
                ),
              },
              {
                label: `页面`,
                key: "page",
                children: <PageList pageConfig={pageData?.pages} />,
              },
            ]}
          />
        </section>
        {/* 中间画布 */}
        <section className={styles.center}>
          <div
            className={styles.content}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={handleMouseDown}
            onClick={deSelectCurComponent}
          >
            <Editor />
          </div>
        </section>
        {/* 右侧属性列表 */}
        <section className={styles.right}>
          {curComponent ? (
            <Tabs
              defaultActiveKey="attr"
              items={[
                {
                  label: `属性`,
                  key: "attr",
                  children: (
                    <div className={styles["attr-list"]}>
                      {getAttrComponent(curComponent.component)}
                    </div>
                  ),
                },
                {
                  label: `动画`,
                  key: "animation",
                  children: <AnimationList />,
                },
                {
                  label: `事件`,
                  key: "events",
                  children: <EventList />,
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
