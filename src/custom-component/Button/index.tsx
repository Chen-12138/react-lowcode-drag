import { ComponentListItem } from "../component-list";
import styles from "./index.less";

interface ButtonProps {
  element: ComponentListItem;
}

const Button: React.FC<ButtonProps> = function ({ element }) {
  return (
    <div className={styles.button} style={element.style}>
      {element.propValue}
    </div>
  );
};

export default Button;
