import { Button, InputNumber, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../hook/useAction";
import { ActionTypes } from "../../state/constants/actionTypes";
import { State } from "../../state/reducer";
import styles from "./index.less";

const Toolbar = function () {
  const editorConfig = useSelector(
    (state: State) => state.editor.canvasStyleData
  );
  const dispatch = useDispatch();
  const { setCurComponent, setComponetData, undo, redo } = useAction();

  const handleChange = (type: string, val: number | null) => {
    dispatch({
      type: ActionTypes.SetCanvasStyleData,
      payload: {
        width: type === "width" ? val : editorConfig.width,
        height: type === "height" ? val : editorConfig.height,
        scale: type === "scale" ? val : editorConfig.scale,
      },
    });
  };

  const clearCanvas = () => {
    setCurComponent({ curComponent: null, curComponentIndex: null });
    setComponetData([]);
  };

  return (
    <Space className={styles.toolbar}>
      {/* <Button>JSON</Button> */}
      <Button onClick={undo}>撤销</Button>
      <Button onClick={redo}>重做</Button>
      {/* <Button>插入图片</Button>
      <Button>预览</Button>
      <Button>保存</Button> */}
      <Button onClick={clearCanvas}>清空画布</Button>
      {/* <Button>组合</Button>
      <Button>拆分</Button>
      <Button>锁定</Button>
      <Button>解锁</Button>
      <Button>截图</Button> */}
      <div className={styles["canvas-config"]}>
        <span>画布大小</span>
        <InputNumber
          type="text"
          value={editorConfig.width}
          onChange={(val) => handleChange("width", val)}
        />
        <span>*</span>
        <InputNumber
          type="text"
          value={editorConfig.height}
          onChange={(val) => handleChange("height", val)}
        />
      </div>
      <div className={styles["canvas-config"]}>
        <span>画布比例</span>
        <InputNumber
          type="text"
          value={editorConfig.height}
          onChange={(val) => handleChange("scale", val)}
        />{" "}
        %
      </div>
    </Space>
  );
};

export default Toolbar;
