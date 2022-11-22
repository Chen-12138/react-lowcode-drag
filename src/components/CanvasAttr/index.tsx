import { Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "@/state/constants/actionTypes";
import { State } from "@/state/reducer";
import SketchColor from "../SketchColor";
import styles from "./index.less";

const CanvasAttr = function () {
  const canvasStyleData = useSelector(
    (state: State) => state.editor.canvasStyleData
  );
  const dispatch = useDispatch();

  const handleChange = (style: string, newStyle: any) => {
    dispatch({
      type: ActionTypes.SetCanvasStyleData,
      payload: newStyle,
    });
  };

  return (
    <div className={styles["attr-container"]}>
      <p className={styles["title"]}>画布属性</p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={canvasStyleData}
        onValuesChange={handleChange}
        autoComplete="off"
      >
        <Form.Item label="颜色" name="color">
          <SketchColor />
        </Form.Item>
        <Form.Item label="不透明度" name="opacity">
          <InputNumber />
        </Form.Item>
        <Form.Item label="背景颜色" name="backgroundColor">
          <SketchColor />
        </Form.Item>
        <Form.Item label="字体大小" name="fontSize">
          <InputNumber />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CanvasAttr;
