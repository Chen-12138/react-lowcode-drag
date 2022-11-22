import { Button, InputNumber, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "@/hook/useAction";
import { ActionTypes } from "@/state/constants/actionTypes";
import { State } from "@/state/reducer";
import styles from "./index.less";
import html2canvas from "html2canvas";

const Toolbar = function () {
  const editorConfig = useSelector(
    (state: State) => state.editor.canvasStyleData
  );

  const { editor } = useSelector((state: State) => state.editor);
  const dispatch = useDispatch();
  const { undo, redo, clearCanvas } = useAction();

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

  const handleScreenshot = () => {
    html2canvas(editor, { useCORS: true }).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  };

  return (
    <Space className={styles.toolbar}>
      {/* <Button>JSON</Button> */}
      <Button onClick={undo}>撤销</Button>
      <Button onClick={redo}>重做</Button>
      <Button onClick={clearCanvas}>清空画布</Button>
      <Button onClick={handleScreenshot}>截图</Button>
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
          value={editorConfig.scale}
          onChange={(val) => handleChange("scale", val)}
        />{" "}
        %
      </div>
    </Space>
  );
};

export default Toolbar;
