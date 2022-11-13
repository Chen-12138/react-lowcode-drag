import { CSSProperties, ReactElement } from "react";
import { ComponentListItem } from "../../../custom-component/component-list";
import useAction from "../../../hook/useAction";
import styles from "./index.less";
import { pointList } from "./const";

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
      // cursor: this.cursors[point],
    };

    return style;
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
            ></div>
          ))}
        </>
      )}
      {children}
    </div>
  );
};

export default ComponentWrap;
