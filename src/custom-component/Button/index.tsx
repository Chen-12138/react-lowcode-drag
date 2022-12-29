import { ComponentListItem } from "../component-list";
import Text from "../Text";
import styles from "./index.less";

interface ButtonProps {
  element: ComponentListItem;
}

const Button: React.FC<ButtonProps> = function ({ element }) {
  return (
    <div className={styles.button} style={element.style}>
      <Text element={element} />
    </div>
  );
};

export default Button;
