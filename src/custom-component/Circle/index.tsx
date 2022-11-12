import { CSSProperties } from "react";
import styles from "./index.less";

interface CircleProps {
  style: CSSProperties;
}

const Circle: React.FC<CircleProps> = function ({ style }) {
  return <div className={styles.circle} style={style}></div>;
};

export default Circle;
