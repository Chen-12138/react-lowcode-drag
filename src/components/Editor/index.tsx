import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state/reducer";
import ContextMenu from "./ContextMenu";
import Grid from "./Grid";
import ComponentWrap from "./ComponentWrap";
import Text from "../../custom-component/Text";
import styles from "./index.less";
import { ComponentListItem } from "../../custom-component/component-list";
import { getComponentWrapStyle, getStyle } from "../../utils/style";
import useAction from "../../hook/useAction";
import Button from "../../custom-component/Button";
import Rect from "../../custom-component/Rect";
import Circle from "../../custom-component/Circle";
import Image from "../../custom-component/Image";

const Editor = function () {
  const { canvasStyleData, componentData, curComponent, menuShow } =
    useSelector((state: State) => state.editor);
  const { setEditor, showContextMenu, hideContextMenu } = useAction();
  const editorRef = useRef<HTMLDivElement>(null);

  // 处理右键菜单
  const handleContextMenu = (e: { [x: string]: any }) => {
    e.stopPropagation();
    e.preventDefault();

    // 先获取编辑器的位移信息
    const editorReactInfo = editorRef.current?.getBoundingClientRect();

    const editorX = editorReactInfo?.x || 0;
    const editorY = editorReactInfo?.y || 0;

    showContextMenu({
      top: e.clientY - editorY,
      left: e.clientX - editorX,
    });
  };

  // 点击事件
  const handleClick = (e: { [x: string]: any }) => {
    if (e.button !== 2) {
      hideContextMenu();
    }
  };

  // 因为其他页面也需要获取到Editor，所以直接把他放到redux里吧
  useEffect(() => {
    setEditor(editorRef.current);
  }, []);

  const getComponent = (item: ComponentListItem) => {
    switch (item.component) {
      case "Text": {
        return <Text element={item} />;
      }

      case "Button": {
        return <Button style={getStyle(item.style)} />;
      }

      case "Rect": {
        return <Rect element={item} />;
      }

      case "Circle": {
        return <Circle element={item} />;
      }

      case "Image": {
        return <Image propValue={item.propValue} />;
      }

      default: {
        return <Text element={item} />;
      }
    }
  };

  return (
    <div
      className={styles.editor}
      ref={editorRef}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      style={{
        ...canvasStyleData,
        width: canvasStyleData.width + "px",
        height: canvasStyleData.height + "px",
      }}
    >
      {/* 网格 */}
      <Grid />

      {componentData.map((item, index) => {
        return (
          <ComponentWrap
            key={item.id}
            defaultStyle={item.style}
            style={getComponentWrapStyle(item.style)}
            active={item.id === (curComponent || ({} as ComponentListItem)).id}
            element={item}
            index={index}
          >
            {getComponent(item)}
          </ComponentWrap>
        );
      })}

      {/* 右击菜单 */}
      {menuShow && <ContextMenu />}
    </div>
  );
};

export default Editor;
