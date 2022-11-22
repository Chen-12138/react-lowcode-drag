import styles from "./index.less";
import logo from "../../asset/img/logo.png";

const Header = () => {
  return (
    <div className={styles["components-page-header"]}>
      <div className={styles["page-header-inner"]}>
        <div className={styles["logo-wrapper"]}>
          <img className="cursor-pointer" src={logo} />
          <span>Lucky H5</span>
        </div>
        <div className={styles["header-center-wrapper"]}></div>
        <div className={styles["user-wrapper"]}>登录</div>
      </div>
    </div>
  );
};

export default Header;
