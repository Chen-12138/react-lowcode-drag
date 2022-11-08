import { Form, Input } from 'antd';
import './index.less';

const CanvasAttr = function () {
    return <div className="attr-container">
        <p className="title">画布属性</p>
        <Form
            name="basic"
            initialValues={{ remember: true }}
            layout="vertical"
            autoComplete="off"
            >
            <Form.Item
                label="颜色"
                name="color"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="不透明度"
                name="opacity"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="背景颜色"
                name="backgroundColor"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="字体大小"
                name="fontSize"
            >
                <Input.Password />
            </Form.Item>
        </Form>
    </div>
}

export default CanvasAttr;