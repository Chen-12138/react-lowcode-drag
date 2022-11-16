import { CSSProperties, ReactElement, useMemo } from "react";
import { ComponentListItem } from "../../../custom-component/component-list";
import useAction from "../../../hook/useAction";
import styles from "./index.less";
import { pointList, initialAngle, angleToCursor } from "./const";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducer";
import { mod360 } from "../../../utils/translate";

interface ComponentWrapProps {
  active?: boolean;
  element: ComponentListItem;
  index: number;
  children: ReactElement;
  defaultStyle: CSSProperties;
  style: CSSProperties;
}

const ComponentWrap: React.FC<ComponentWrapProps> = ({
  active,
  element,
  index,
  children,
  defaultStyle,
  style,
}) => {
  const { editor, curComponent } = useSelector((state: State) => state.editor);
  const { setCurComponent, setComponentStyle, setClickComponentStatus } =
    useAction();

  const getPointStyle = (point: string) => {
    let { width, height } = defaultStyle;
    width = Number(width);
    height = Number(height);
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2;
        newTop = hasT ? 0 : height;
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = Math.floor(height / 2);
      }
    }

    const style = {
      marginLeft: "-4px",
      marginTop: "-4px",
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: cursors?.[point],
    };

    return style;
  };

  const getCursor = () => {
    if (curComponent) {
      // TODO，旋转的情况还没考虑
      const rotate = curComponent.style.rotate;
      const result: { [x: string]: string } = {};

      pointList.forEach((point, index) => {
        result[point] = angleToCursor[index].cursor + "-resize";
      });
      return result;
    }
  };

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setClickComponentStatus(true);
    setCurComponent({ curComponent: element, curComponentIndex: index });

    const pos = { ...defaultStyle };
    const startY = e.clientY;
    const startX = e.clientX;

    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    const move = (moveEvent: any) => {
      moveEvent.stopPropagation();

      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      pos.top = curY - startY + startTop;
      pos.left = curX - startX + startLeft;

      setComponentStyle(pos);
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const handleMouseDownOnPoint = (point: string, e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const pos = { ...defaultStyle };
    const width = Number(pos.width);
    const height = Number(pos.height);
    const left = Number(pos.left);
    const top = Number(pos.top);
    const startX = e.clientX;
    const startY = e.clientY;

    const move = (mouseEvent: any) => {
      const currX = mouseEvent.clientX;
      const currY = mouseEvent.clientY;
      const disY = currY - startY;
      const disX = currX - startX;
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
      const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
      pos.height = newHeight > 0 ? newHeight : 0;
      pos.width = newWidth > 0 ? newWidth : 0;
      pos.left = left + (hasL ? disX : 0);
      pos.top = top + (hasT ? disY : 0);

      setComponentStyle(pos);
    };

    const up = (e: any) => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const cursors = useMemo(() => {
    return getCursor();
  }, [curComponent, curComponent?.style.rotate]);

  return (
    <div
      className={`${styles["component-wrap"]} ${active ? styles.active : ""}`}
      style={style}
      onMouseDown={handleMouseDown}
    >
      {active && (
        <>
          {pointList.map((item) => (
            <div
              key={item}
              className={styles["wrap-point"]}
              style={getPointStyle(item)}
              onMouseDown={(event) => handleMouseDownOnPoint(item, event)}
            ></div>
          ))}
        </>
      )}
      {children}
    </div>
  );
};

export default ComponentWrap;
