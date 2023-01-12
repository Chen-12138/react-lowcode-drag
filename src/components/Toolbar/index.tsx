import { Button, InputNumber, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "@/hook/useAction";
import { ActionTypes } from "@/state/constants/actionTypes";
import { State } from "@/state/reducer";
import styles from "./index.less";
import html2canvas from "html2canvas";
import { updatePage } from "@/api";

const Toolbar = function () {
  const { projectData } = useSelector((state: State) => state.editor);
  const { canvasStyleData } = projectData;

  const { editor } = useSelector((state: State) => state.editor);
  const dispatch = useDispatch();
  const { undo, redo, clearCanvas } = useAction();

  const handleChange = (type: string, val: number | null) => {
    dispatch({
      type: ActionTypes.SetCanvasStyleData,
      payload: {
        width: type === "width" ? val : canvasStyleData.width,
        height: type === "height" ? val : canvasStyleData.height,
        scale: type === "scale" ? val : canvasStyleData.scale,
      },
    });
  };

  const handleScreenshot = () => {
    html2canvas(editor, { useCORS: true }).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  };

  const handleSave = async () => {
    try {
      await updatePage(projectData);
      message.success("保存成功");
    } catch {
      message.error("保存失败");
    }
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
          value={canvasStyleData?.width}
          onChange={(val) => handleChange("width", val)}
        />
        <span>*</span>
        <InputNumber
          type="text"
          value={canvasStyleData?.height}
          onChange={(val) => handleChange("height", val)}
        />
      </div>
      <div className={styles["canvas-config"]}>
        <span>画布比例</span>
        <InputNumber
          type="text"
          value={canvasStyleData?.scale}
          onChange={(val) => handleChange("scale", val)}
        />{" "}
        %
      </div>
      <Button style={{ marginLeft: 24 }} onClick={handleSave}>
        保存项目
      </Button>
    </Space>
  );
};

export default Toolbar;
