import styles from "./index.less";
import logo from "../../asset/img/logo.png";
import { useNavigate } from "react-router-dom";
import { ReactElement } from "react";

interface HeaderProps {
  children?: ReactElement;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();

  const linkToHome = () => {
    navigate("/home/my-work", {
      replace: false,
    });
  };

  const linkToLogin = () => {
    navigate("/login", {
      replace: false,
    });
  };

  return (
    <div className={styles["components-page-header"]}>
      <div className={styles["page-header-inner"]}>
        <div className={styles["logo-wrapper"]} onClick={linkToHome}>
          <img className="cursor-pointer" src={logo} />
          <span>Lucky H5</span>
        </div>
        <div className={styles["header-center-wrapper"]}>{children}</div>
        <div className={styles["user-wrapper"]} onClick={linkToLogin}>
          登录
        </div>
      </div>
    </div>
  );
};

export default Header;
