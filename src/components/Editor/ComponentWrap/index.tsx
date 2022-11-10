import { CSSProperties, ReactElement } from "react";
import styles from "./index.less";

interface ComponentWrapProps {
  active?: boolean;
  children: ReactElement;
  style: CSSProperties;
}

const ComponentWrap: React.FC<ComponentWrapProps> = ({
  active,
  children,
  style,
}) => {
  console.log(style);
  return (
    <div
      className={`${styles["component-wrap"]} ${active ? styles.active : ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ComponentWrap;
