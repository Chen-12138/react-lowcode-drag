import styles from "./index.less";

interface TextProps {}

const Text: React.FC<TextProps> = function () {
  return <div className={`${styles.text}`}>123</div>;
};

export default Text;
