import styles from "./index.less";

interface RectProps {}

const Text: React.FC<RectProps> = function () {
  return <div className={styles.rect}>Rect</div>;
};

export default Text;
