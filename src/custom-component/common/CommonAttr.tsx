import { Form, Input, Checkbox, Button } from "antd";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state/reducer";
import { styleData } from "../../utils/attr";

const CommonAttr = () => {
  const editorConfig = useSelector((state: State) => state.editor);

  const styleKeys = useMemo(() => {
    const curComponent = editorConfig.curComponent || { style: {} };
    const curComponentStyleKeys = Object.keys(curComponent.style);
    return styleData.filter((item) => curComponentStyleKeys.includes(item.key));
  }, [editorConfig.curComponent]);

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      {styleKeys.map(({ key, label }, index) => {
        return (
          <Form.Item label={label} name={key} key={index}>
            <Input />
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default CommonAttr;
