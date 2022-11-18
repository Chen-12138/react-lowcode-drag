import { ComponentListItem } from "../component-list";
import Text from "../Text";
import styles from "./index.less";

interface CircleProps {
  element: ComponentListItem;
}

const Circle: React.FC<CircleProps> = function ({ element }) {
  return (
    <div className={styles.circle} style={element.style}>
      <Text element={element} />
    </div>
  );
};

export default Circle;
