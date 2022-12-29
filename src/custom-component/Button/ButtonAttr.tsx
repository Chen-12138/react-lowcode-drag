import useAction from "@/hook/useAction";
import { State } from "@/state/reducer";
import { Form, Input } from "antd";
import { useSelector } from "react-redux";
import CommonAttr from "../common/CommonAttr";

const ButtonAttr = () => {
  const { curComponent } = useSelector((state: State) => state.editor);
  const { setComponentContent } = useAction();

  return (
    <div>
      <h3>ButtonAttr</h3>
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

export default ButtonAttr;
