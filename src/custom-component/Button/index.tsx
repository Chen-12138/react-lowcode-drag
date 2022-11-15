import { CSSProperties } from "react";
import styles from "./index.less";

interface ButtonProps {
  style: CSSProperties;
}

const Button: React.FC<ButtonProps> = function ({ style }) {
  return (
    <div className={styles.button} style={style}>
      Button
    </div>
  );
};

export default Button;
