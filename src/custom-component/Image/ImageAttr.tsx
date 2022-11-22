import { Form, Input } from "antd";
import { useSelector } from "react-redux";
import useAction from "@/hook/useAction";
import { State } from "@/state/reducer";

const ImageAttr = () => {
  const { curComponent } = useSelector((state: State) => state.editor);

  const { updateComponentPropValue } = useAction();

  const handleChange = (val: string) => {
    updateComponentPropValue(val);
  };

  return (
    <Form.Item>
      <Input
        value={curComponent?.propValue}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </Form.Item>
  );
};

export default ImageAttr;
