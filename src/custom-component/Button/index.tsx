import styles from "./index.less";

interface ButtonProps {}

const Button: React.FC<ButtonProps> = function () {
  return <div className={styles.button}>Button</div>;
};

export default Button;
