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
  } = useAction();

  const handleMouseUp = (e: any) => {
    console.log("@@@ContenxtMenu, up");
    setClickComponentStatus(true);
  };

  const handleDelete = () => {
    console.log("delete");
    deleteComponent();
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
        <li onClick={upComponent}>上移</li>
        <li onClick={downComponent}>下移</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
