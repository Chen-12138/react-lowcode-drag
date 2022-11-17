import useAction from "../../../hook/useAction";
import styles from "./index.less";

interface ContextMenuProps {
  contextMenuPos: {
    top: number;
    left: number;
  };
}

const ContextMenu: React.FC<ContextMenuProps> = function ({ contextMenuPos }) {
  const {
    upComponent,
    downComponent,
    deleteComponent,
    setClickComponentStatus,
    recordSnapshot,
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

  return (
    <div
      className={styles.contextmenu}
      style={{
        top: contextMenuPos.top + "px",
        left: contextMenuPos.left + "px",
      }}
    >
      <ul onMouseUp={handleMouseUp}>
        <li>复制</li>
        <li>粘贴</li>
        <li>剪切</li>
        <li onClick={handleDelete}>删除</li>
        <li>锁定</li>
        <li>置顶</li>
        <li>置底</li>
        <li onClick={handleUp}>上移</li>
        <li onClick={handleDown}>下移</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
