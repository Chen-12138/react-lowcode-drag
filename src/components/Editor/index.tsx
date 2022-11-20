import { useEffect, useRef, useState } from "react";
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
import Area from "./Area";

interface AreaStyle {
  top: number;
  left: number;
  width: number;
  height: number;
}

const Editor = function () {
  const { canvasStyleData, componentData, curComponent, menuShow } =
    useSelector((state: State) => state.editor);
  const { setEditor, showContextMenu, hideContextMenu } = useAction();
  const editorRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [isShowArea, setIsShowArea] = useState(false);
  const [areaStyle, setAreaStyle] = useState<AreaStyle>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // 处理右键菜单
  const handleContextMenu = (e: any) => {
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
  const handleClick = (e: any) => {
    if (e.button !== 2) {
      hideContextMenu();
    }
  };

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    const rectInfo = editorRef.current.getBoundingClientRect();
    const editorX = rectInfo.x;
    const editorY = rectInfo.y;

    const startX = e.clientX - editorX;
    const startY = e.clientY - editorY;

    const move = (moveEvent: any) => {
      // 展示选中区域
      setIsShowArea(true);

      const width = Math.abs(moveEvent.clientX - e.clientX);
      const height = Math.abs(moveEvent.clientY - e.clientY);

      setAreaStyle({
        top: moveEvent.clientY - e.clientY > 0 ? startY : startY - height,
        left: moveEvent.clientX - e.clientX > 0 ? startX : startX - width,
        width,
        height,
      });
    };

    const up = () => {
      setIsShowArea(false);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const getComponent = (item: ComponentListItem) => {
    switch (item.component) {
      case "Text": {
        return <Text element={item} />;
      }

      case "Button": {
        return <Button element={item} />;
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

  const getSelectComponent = () => {
    const result: ComponentListItem[] = [];
    // 区域的起点
    const {
      top: areaTop,
      left: areaLeft,
      width: areaWidth,
      height: areaHeight,
    } = areaStyle;
    // 遍历所有组件，找出在选中区域内的组件
    componentData.forEach((component) => {
      const { left, top, width, height } = component;
      if (
        areaLeft <= left &&
        areaTop <= top &&
        left + width <= areaLeft + areaWidth &&
        top + height <= areaTop + areaHeight
      ) {
        result.push(component);
      }
    });

    return result;
  };

  // 因为其他页面也需要获取到Editor，所以直接把他放到redux里吧
  useEffect(() => {
    setEditor(editorRef.current);
  }, []);

  return (
    <div
      className={styles.editor}
      ref={editorRef}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
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

      {/* 选中区域 */}
      {isShowArea && <Area style={areaStyle} />}
    </div>
  );
};

export default Editor;
