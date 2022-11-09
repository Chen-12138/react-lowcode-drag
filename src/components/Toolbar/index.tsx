import { Button, InputNumber, Space } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../state/constants/actionTypes';
import { State } from '../../state/reducer';
import './index.less';

const Toolbar = function() {

    const editorConfig = useSelector((state: State) => state.editor.canvasStyleData);
    const dispatch = useDispatch()

    const handleChange = function(type: string, val: number | null) {
        console.log(val)
        dispatch({
            type: ActionTypes.SetCanvasStyleData,
            payload: {
                width: type === "width" ? val : editorConfig.width,
                height: type === "height" ? val : editorConfig.height,
            },
        });
    }

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
            <InputNumber  type="text" value={editorConfig.width} onChange={(val) => handleChange('width', val)}/>
            <span>*</span>
            <InputNumber  type="text" value={editorConfig.height} onChange={(val) => handleChange('height', val)}/>
        </div>
        <div className="canvas-config">
            <span>画布比例</span>
            <input/> %
        </div>
    </Space>
}

export default Toolbar;