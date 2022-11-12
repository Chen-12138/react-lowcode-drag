import { CSSProperties } from "react";
import styles from "./index.less";

interface RectProps {
  style: CSSProperties;
}

const Rect: React.FC<RectProps> = function ({ style }) {
  return <div className={styles.rect} style={style}></div>;
};

export default Rect;
