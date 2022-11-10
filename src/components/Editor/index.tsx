import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../../state/constants/actionTypes";
import { State } from "../../state/reducer";
import ContextMenu from "./ContextMenu";
import Grid from "./Grid";
import ComponentWrap from "./ComponentWrap";
import Text from "../../custom-component/Text";
import styles from "./index.less";

const Editor = function () {
  const editorConfig = useSelector((state: State) => state.editor);
  const dispatch = useDispatch();
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
    dispatch({
      type: ActionTypes.SetEditor,
      payload: editorRef.current,
    });
  }, [editorRef.current]);

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

      {editorConfig.componentData.map((item) => {
        return (
          <ComponentWrap
            key={item.id}
            style={{ top: item.style.top, left: item.style.left }}
          >
            <Text />
          </ComponentWrap>
        );
      })}

      {/* 右击菜单 */}
      {showContextMenu ? <ContextMenu contextMenuPos={contextMenuPos} /> : null}
    </div>
  );
};

export default Editor;
