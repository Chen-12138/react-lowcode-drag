import { Action, ActionTypes } from "../constants/actionTypes";

export interface CanvasStyleData {
    width: number,
    height: number,
    scale: number,
    color: string,
    opacity: number,
    background: string,
    fontSize: number,
}

export interface EditorState {
    // 编辑器模式 edit preview
    editMode: "edit" | 'preview';
    // 页面全局数据
    canvasStyleData: CanvasStyleData;
    // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
    isInEdiotr: boolean;
    // 画布组件数据
    componentData: any[];
    curComponent: any;
    curComponentIndex: number | any;
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: boolean;
}

export const initialState: EditorState = {
    editMode: 'edit',
    canvasStyleData: { 
        width: 1280,
        height: 720,
        scale: 100,
        color: '#000',
        opacity: 1,
        background: '#fff',
        fontSize: 14,
    },
    isInEdiotr: false, 
    componentData: [], 
    curComponent: null,
    curComponentIndex: null,
    isClickComponent: false,
};

export default (state: EditorState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SetCanvasStyleData: {
            const payload = action.payload as CanvasStyleData;
            return {
                ...state,
                canvasStyleData: {
                    ...state.canvasStyleData,
                    ...payload
                }
            };
        }

        default:
            return state;
    }
}