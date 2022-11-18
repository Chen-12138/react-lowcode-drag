import { ComponentListItem } from "../component-list";
import Text from "../Text";
import styles from "./index.less";

interface RectProps {
  element: ComponentListItem;
}

const Rect: React.FC<RectProps> = function ({ element }) {
  return (
    <div className={styles.rect} style={element.style}>
      <Text element={element} />
    </div>
  );
};

export default Rect;
