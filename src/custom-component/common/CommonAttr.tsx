import { Form, InputNumber, Select, Collapse } from "antd";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import SketchColor from "../../components/SketchColor";
import useAction from "../../hook/useAction";
import { State } from "../../state/reducer";
import { optionMap, styleData } from "../../utils/attr";

const { Panel } = Collapse;

const CommonAttr = () => {
  const { curComponent } = useSelector((state: State) => state.editor);
  const { setComponentStyle } = useAction();
  const [form] = Form.useForm();
  const styleKeys = useMemo(() => {
    const cur = curComponent || { style: {} };
    const curComponentStyleKeys = Object.keys(cur.style);
    return styleData.filter((item) => curComponentStyleKeys.includes(item.key));
  }, [curComponent]);

  const getFormItem = (key: string) => {
    if (key.indexOf("Color") >= 0 || key.indexOf("color") >= 0) {
      return <SketchColor key={key} />;
    } else if (key in optionMap) {
      return <Select key={key} options={optionMap[key]} />;
    } else {
      return <InputNumber key={key} />;
    }
  };

  const onChange = (key: string | string[]) => {
    if (curComponent) {
      curComponent.collapseName = key;
    }
  };

  useEffect(() => {
    form.setFieldsValue(curComponent?.style);
  }, [curComponent?.style, form]);

  return (
    <Collapse defaultActiveKey={["style"]} onChange={onChange} ghost>
      <Panel header="通用样式" key="style">
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onValuesChange={(_, val) => {
            setComponentStyle(val);
          }}
          autoComplete="off"
        >
          {styleKeys.map(({ key, label }, index) => {
            return (
              <Form.Item label={label} name={key} key={index}>
                {getFormItem(key)}
              </Form.Item>
            );
          })}
        </Form>
      </Panel>
      {/* <Panel header="This is panel header 2" key="2">
        测试
      </Panel> */}
    </Collapse>
  );
};

export default CommonAttr;
