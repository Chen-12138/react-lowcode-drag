import CommonAttr from "../common/CommonAttr";
import { State } from "@/state/reducer";
import { Input, Form } from "antd";
import { useSelector } from "react-redux";
import useAction from "@/hook/useAction";

const RectAttr = () => {
  const { curComponent } = useSelector((state: State) => state.editor);
  const { setComponentContent } = useAction();

  return (
    <div>
      <h3>RectAttr</h3>
      <CommonAttr />
      <Form
        layout="vertical"
        initialValues={{ content: curComponent?.propValue }}
        onValuesChange={(val) => {
          if (curComponent) {
            setComponentContent(val.content);
          }
        }}
      >
        <Form.Item name="content" label="内容">
          <Input placeholder="请输入文案" autoComplete="off" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RectAttr;
