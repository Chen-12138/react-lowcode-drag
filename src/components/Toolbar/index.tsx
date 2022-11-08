import { Button, Space } from 'antd';
import './index.css';

const Toolbar = function() {
    return <Space className="toolbar">
        <Button>JSON</Button>
        <Button>撤销</Button>
        <Button>重做</Button>
        <Button>插入图片</Button>
        <Button>预览</Button>
        <Button>保存</Button>
        <Button>清空画布</Button>
        <Button>组合</Button>
        <Button>拆分</Button>
        <Button>锁定</Button>
        <Button>解锁</Button>
        <Button>截图</Button>
        <div className='canvas-config'>
            <span>画布大小</span>
            <input type="text" />
            <span>*</span>
            <input type="text" />
        </div>
    </Space>
}

export default Toolbar;