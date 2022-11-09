import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { State } from "../../state/reducer";
import ContextMenu from "./ContextMenu";
import Grid from "./Grid";
import './index.less';

const Editor = function () {

    const editorConfig = useSelector((state: State) => state.editor);

    console.log(editorConfig);
    const editorRef = useRef<HTMLDivElement>(null);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPos, setContextMenuPos] = useState({
        top: 0,
        left: 0
    })

    // 处理右键菜单
    const handleContextMenu = useCallback((e: { [x: string]: any; }) => {
        e.stopPropagation();
        e.preventDefault();

        // 先获取编辑器的位移信息
        const editorReactInfo = editorRef.current?.getBoundingClientRect();

        const editorX = editorReactInfo?.x || 0;
        const editorY = editorReactInfo?.y || 0;

        setContextMenuPos({
            top: e.y - editorY,
            left: e.x - editorX
        })
        setShowContextMenu(true);
    }, []);

    // 点击事件
    const handleClick = useCallback((e: { [x: string]: any; }) => {
        if(e.button !== 2) {
            setShowContextMenu(false);
        }
    }, []);

    useEffect(() => {
        editorRef.current?.addEventListener('contextmenu', handleContextMenu);
        editorRef.current?.addEventListener('click', handleClick);
        return () => {
            editorRef.current?.removeEventListener('contextmenu', handleContextMenu);
            editorRef.current?.removeEventListener('click', handleClick);
        }
    },[handleClick, handleContextMenu]);

    return (
        <div className="editor" ref={editorRef} style={{ 
            ...editorConfig.canvasStyleData, 
            width: editorConfig.canvasStyleData.width + 'px',
            height: editorConfig.canvasStyleData.height + 'px'
        }}>
            <Grid />

            {/* 右击菜单 */}
            {
                showContextMenu ? <ContextMenu contextMenuPos={contextMenuPos} /> : null
            }
        </div>
    )
}

export default Editor;