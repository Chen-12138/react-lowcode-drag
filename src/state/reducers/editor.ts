import { message } from "antd";
import { CSSProperties } from "react";
import { ComponentListItem } from "../../custom-component/component-list";
import { swap } from "../../utils/utils";
import {
  Action,
  ActionTypes,
  SetCurComponentPayload,
} from "../constants/actionTypes";

export interface CanvasStyleData {
  width: number;
  height: number;
  scale: number;
  color: string;
  opacity: number;
  backgroundColor: string;
  fontSize: number;
}

export interface EditorState {
  // 编辑器的ref
  editor: any;
  // 编辑器模式 edit preview
  editMode: "edit" | "preview";
  // 页面全局数据
  canvasStyleData: CanvasStyleData;
  // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
  isInEdiotr: boolean;
  // 画布组件数据
  componentData: ComponentListItem[];
  curComponent: ComponentListItem | null;
  curComponentIndex: number;
  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  isClickComponent: boolean;
}

export const editorInitialState: EditorState = {
  editor: null,
  editMode: "edit",
  canvasStyleData: {
    width: 1280,
    height: 720,
    scale: 100,
    color: "#000000",
    opacity: 1,
    backgroundColor: "#4A90E2",
    fontSize: 14,
  },
  isInEdiotr: false,
  componentData: [],
  curComponent: null,
  curComponentIndex: -1,
  isClickComponent: false,
};

const editorReducer = (
  state: EditorState = editorInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SetEditor: {
      return {
        ...state,
        editor: action.payload,
      };
    }

    case ActionTypes.SetCanvasStyleData: {
      const payload = action.payload as CanvasStyleData;
      return {
        ...state,
        canvasStyleData: {
          ...state.canvasStyleData,
          ...payload,
        },
      };
    }

    case ActionTypes.AddComponent: {
      const component = action.payload as ComponentListItem;
      state.componentData.push(component);
      return {
        ...state,
      };
    }

    case ActionTypes.SetCurComponent: {
      const { curComponent, curComponentIndex } =
        action.payload as SetCurComponentPayload;
      return {
        ...state,
        curComponent,
        curComponentIndex,
      };
    }

    case ActionTypes.SetWrapStyle: {
      const curComponent = state.curComponent;
      const { top, left, width, height, rotate } = action.payload as any;
      if (curComponent) {
        if (top) curComponent.style.top = Math.round(top);
        if (left) curComponent.style.left = Math.round(left);
        if (width) curComponent.style.width = Math.round(width);
        if (height) curComponent.style.height = Math.round(height);
        if (rotate) curComponent.style.rotate = Math.round(rotate);
      }

      return {
        ...state,
        curComponent,
      };
    }

    case ActionTypes.SetClickComponentStatus: {
      const status = action.payload as boolean;
      return {
        ...state,
        isClickComponent: status,
      };
    }

    case ActionTypes.SetComponentData: {
      const componentData = action.payload as ComponentListItem[];
      return {
        ...state,
        componentData: componentData,
      };
    }

    case ActionTypes.SetComponentStyle: {
      const curComponent = state.curComponent || { style: {} };
      const style = action.payload as CSSProperties;
      curComponent.style = {
        ...curComponent.style,
        ...style,
      };

      return {
        ...state,
        curComponent,
      };
    }

    case ActionTypes.DeleteComponent: {
      const index = action.payload as number;
      if (index === undefined) {
        state.componentData.splice(state.curComponentIndex);
      } else {
        state.componentData.splice(index, 1);
      }
      return {
        ...state,
      };
    }

    case ActionTypes.UpComponent: {
      const { componentData, curComponentIndex } = state;
      // 上移图层 index，表示元素在数组中越往后
      if (curComponentIndex < componentData.length - 1) {
        swap(componentData, curComponentIndex, curComponentIndex + 1);
        state.curComponentIndex = curComponentIndex + 1;
      } else {
        message.info("已经到顶了");
      }
      return {
        ...state,
      };
    }

    case ActionTypes.DownComponent: {
      const { componentData, curComponentIndex } = state;
      if (curComponentIndex > 0) {
        swap(componentData, curComponentIndex - 1, curComponentIndex);
        state.curComponentIndex = curComponentIndex - 1;
      } else {
        message.info("已经到底了");
      }
      return {
        ...state,
      };
    }

    case ActionTypes.UpdateComponentPropValue: {
      const curComponent = state.curComponent;
      const propValue = action.payload as string;
      if (curComponent) {
        curComponent.propValue = propValue;
      }
      return {
        ...state,
        curComponent,
      };
    }

    default:
      return state;
  }
};

export default editorReducer;
