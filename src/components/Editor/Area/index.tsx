import { CSSProperties } from "react";
import styles from "./index.less";

interface AreaProps {
  style: CSSProperties;
}

const Area: React.FC<AreaProps> = ({ style }) => {
  return <div className={styles.area} style={style}></div>;
};

export default Area;
