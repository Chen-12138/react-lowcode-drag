import { useEffect, useState } from 'react';
import './index.less';

interface ContextMenuProps {
    contextMenuPos: {
        top: number;
        left: number;
    }
}

const ContextMenu: React.FC<ContextMenuProps> = function({
    contextMenuPos
}) {

    return (
        <div className="contextmenu" style={{ top: contextMenuPos.top + 'px', left: contextMenuPos.left + 'px' }}>
            <ul>
                <li>复制</li>
                <li>粘贴</li>
                <li>剪切</li>
                <li>删除</li>
                <li>锁定</li>
                <li>置顶</li>
                <li>置底</li>
                <li>上移</li>
                <li>下移</li>
            </ul>
        </div>
    )
}

export default ContextMenu;