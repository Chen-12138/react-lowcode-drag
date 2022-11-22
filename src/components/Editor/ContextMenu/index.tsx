import { useSelector } from "react-redux";
import useAction from "@/hook/useAction";
import { State } from "@/state/reducer";
import styles from "./index.less";

const ContextMenu: React.FC = function () {
  const { menuLeft, menuTop, curComponent } = useSelector(
    (state: State) => state.editor
  );

  const {
    upComponent,
    downComponent,
    topComponent,
    bottomComponent,
    deleteComponent,
    setClickComponentStatus,
    recordSnapshot,
    copy,
    paste,
    cut,
  } = useAction();

  const handleMouseUp = (e: any) => {
    setClickComponentStatus(true);
  };

  const handleDelete = () => {
    deleteComponent();
    recordSnapshot();
  };

  const handleUp = () => {
    upComponent();
    recordSnapshot();
  };

  const handleDown = () => {
    downComponent();
    recordSnapshot();
  };

  const handleTop = () => {
    topComponent();
    recordSnapshot();
  };

  const handleBottom = () => {
    bottomComponent();
    recordSnapshot();
  };

  const handlePaste = () => {
    paste(true);
    recordSnapshot();
  };

  const handleCut = () => {
    cut();
    recordSnapshot();
  };

  return (
    <div
      className={styles.contextmenu}
      style={{
        top: menuTop,
        left: menuLeft,
      }}
    >
      <ul onMouseUp={handleMouseUp}>
        {curComponent ? (
          <>
            <li onClick={copy}>复制</li>
            <li onClick={handlePaste}>粘贴</li>
            <li onClick={handleCut}>剪切</li>
            <li onClick={handleDelete}>删除</li>
            <li>锁定</li>
            <li onClick={handleTop}>置顶</li>
            <li onClick={handleBottom}>置底</li>
            <li onClick={handleUp}>上移</li>
            <li onClick={handleDown}>下移</li>
          </>
        ) : (
          <li onClick={handlePaste}>粘贴</li>
        )}
      </ul>
    </div>
  );
};

export default ContextMenu;
