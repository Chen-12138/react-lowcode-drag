import { Form, InputNumber, Modal, ModalProps, Switch } from "antd";
import useAnimationAction from "@/hook/useAnimationAction";
import { AnimationItem } from "@/utils/animationClassData";

interface AnimationSettingModalProps extends ModalProps {
  config?: AnimationItem;
  curIndex: number;
  onCancel: () => void;
}

const AnimationSettingModal: React.FC<AnimationSettingModalProps> = ({
  config,
  curIndex,
  onCancel,
  ...props
}) => {
  const { eidtAnimation } = useAnimationAction();
  const [form] = Form.useForm();

  const handleOk = () => {
    const values = form.getFieldsValue();
    eidtAnimation(curIndex, values);
    onCancel();
  };

  return (
    <Modal
      title={config?.label + " 动画配置"}
      centered
      okText={"确定"}
      cancelText={"取消"}
      onOk={handleOk}
      onCancel={onCancel}
      {...props}
    >
      <Form form={form} initialValues={{ ...config }} autoComplete="off">
        <Form.Item label="动画时长" name="animationTime">
          <InputNumber min={0.1} precision={2} step={0.01} />
        </Form.Item>
        <Form.Item label="是否循环" name="isLoop" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AnimationSettingModal;
