import { CSSProperties } from "react";
import styles from "./index.less";

interface TextProps {
  style: CSSProperties;
}

const Text: React.FC<TextProps> = function ({ style }) {
  return (
    <div className={`${styles.text}`} style={style}>
      123
    </div>
  );
};

export default Text;
