import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../../state/constants/actionTypes";
import { State } from "../../state/reducer";
import ContextMenu from "./ContextMenu";
import Grid from "./Grid";
import ComponentWrap from "./ComponentWrap";
import Text from "../../custom-component/Text";
import styles from "./index.less";
import { ComponentListItem } from "../../custom-component/component-list";
import { getComponentWrapStyle } from "../../utils/style";
import useAction from "../../hook/useAction";
import Button from "../../custom-component/Button";
import Rect from "../../custom-component/Rect";

const Editor = function () {
  const editorConfig = useSelector((state: State) => state.editor);
  const { setEditor } = useAction();
  const editorRef = useRef<HTMLDivElement>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({
    top: 0,
    left: 0,
  });

  // 处理右键菜单
  const handleContextMenu = useCallback((e: { [x: string]: any }) => {
    e.stopPropagation();
    e.preventDefault();

    // 先获取编辑器的位移信息
    const editorReactInfo = editorRef.current?.getBoundingClientRect();

    const editorX = editorReactInfo?.x || 0;
    const editorY = editorReactInfo?.y || 0;

    setContextMenuPos({
      top: e.y - editorY,
      left: e.x - editorX,
    });
    setShowContextMenu(true);
  }, []);

  // 点击事件
  const handleClick = useCallback((e: { [x: string]: any }) => {
    if (e.button !== 2) {
      setShowContextMenu(false);
    }
  }, []);

  useEffect(() => {
    editorRef.current?.addEventListener("contextmenu", handleContextMenu);
    editorRef.current?.addEventListener("click", handleClick);
    return () => {
      editorRef.current?.removeEventListener("contextmenu", handleContextMenu);
      editorRef.current?.removeEventListener("click", handleClick);
    };
  }, [handleClick, handleContextMenu]);

  // 因为其他页面也需要获取到Editor，所以直接把他放到redux里吧
  useEffect(() => {
    setEditor(editorRef.current);
  }, [editorRef.current]);

  const getComponent = (type: string) => {
    switch (type) {
      case "Text": {
        return <Text />;
      }

      case "Button": {
        return <Button />;
      }

      case "Rect": {
        return <Rect />;
      }

      default: {
        return <Text />;
      }
    }
  };

  return (
    <div
      className={styles.editor}
      ref={editorRef}
      style={{
        ...editorConfig.canvasStyleData,
        width: editorConfig.canvasStyleData.width + "px",
        height: editorConfig.canvasStyleData.height + "px",
      }}
    >
      {/* 网格 */}
      <Grid />

      {editorConfig.componentData.map((item, index) => {
        return (
          <ComponentWrap
            key={item.id}
            defaultStyle={item.style}
            style={getComponentWrapStyle(item.style)}
            active={
              item.id ===
              (editorConfig.curComponent || ({} as ComponentListItem)).id
            }
            element={item}
            index={index}
          >
            {getComponent(item.component)}
          </ComponentWrap>
        );
      })}

      {/* 右击菜单 */}
      {showContextMenu ? <ContextMenu contextMenuPos={contextMenuPos} /> : null}
    </div>
  );
};

export default Editor;
