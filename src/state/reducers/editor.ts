import { message } from "antd";
import { cloneDeep } from "lodash";
import { CSSProperties } from "react";
import { ComponentListItem } from "@/custom-component/component-list";
import { copyData, restorePreCutData } from "../utils/copy";
import { swap } from "@/utils/utils";
import {
  Action,
  ActionTypes,
  AddEventPayload,
  ContextMenuInfo,
  EditAnimationPayload,
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

export interface CopyData {
  data: ComponentListItem | null;
  index: number;
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
  isClickComponent: boolean;

  // 右键菜单信息
  menuTop: number;
  menuLeft: number;
  menuShow: boolean;

  // 记录相关
  // 编辑器快照数据
  snapshotData: Array<ComponentListItem[]>;
  // 快照索引
  snapshotIndex: -1;

  // 复制相关
  copyData: CopyData | null;
  isCut: boolean;
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

  menuTop: 0,
  menuLeft: 0,
  menuShow: false,

  snapshotData: [],
  snapshotIndex: -1,

  copyData: null,
  isCut: false,
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
        state.componentData.splice(state.curComponentIndex, 1);
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

    case ActionTypes.TopComponent: {
      if (state.curComponentIndex < state.componentData.length - 1) {
        state.componentData.splice(state.curComponentIndex, 1);
        state.componentData.push(state.curComponent!);
        state.curComponentIndex = state.componentData.length - 1;
      } else {
        message.info("已经到顶了");
      }
      return {
        ...state,
      };
    }

    case ActionTypes.BottomComponent: {
      if (state.curComponentIndex > 0) {
        state.componentData.splice(state.curComponentIndex, 1);
        state.componentData.unshift(state.curComponent!);
        state.curComponentIndex = 0;
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

    case ActionTypes.RecordSnapshot: {
      state.snapshotData[++state.snapshotIndex] = cloneDeep(
        state.componentData
      );

      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(
          0,
          state.snapshotIndex + 1
        );
      }

      return {
        ...state,
      };
    }

    case ActionTypes.Undo: {
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--;
        state.componentData =
          cloneDeep(state.snapshotData[state.snapshotIndex]) || [];
        if (state.curComponent !== null) {
          // 如果当前组件不在componentData中，则置空
          const needClean = state.componentData.find(
            (component) => state.curComponent!.id === component.id
          );
          if (needClean) {
            state.curComponent = null;
            state.curComponentIndex = -1;
          }
        }
      }

      return {
        ...state,
      };
    }

    case ActionTypes.Redo: {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
        state.componentData = cloneDeep(
          state.snapshotData[state.snapshotIndex]
        );
      }
      return {
        ...state,
      };
    }

    case ActionTypes.Copy: {
      if (!state.curComponent) {
        message.info("请先选择组件");
        return;
      }
      // 如果有剪切的数据，需要先还原
      restorePreCutData(state);
      copyData(state);

      state.isCut = false;
      return {
        ...state,
      };
    }

    case ActionTypes.Paste: {
      const isMouse = action.payload;

      if (!state.copyData) {
        message.info("请先选择组件");
        return;
      }

      const data = cloneDeep(state.copyData?.data!);
      const id = Math.random();
      data.id = id;

      if (data) {
        if (isMouse) {
          data.style.top = state.menuTop;
          data.style.left = state.menuLeft;
        } else {
          data.style.top += 10;
          data.style.left += 10;
        }
      }
      state.componentData.push(data);

      if (state.isCut) {
        state.copyData = null;
      }

      return {
        ...state,
      };
    }

    case ActionTypes.Cut: {
      if (!state.curComponent) {
        message.info("请先选择组件");
        return;
      }
      // 如果重复剪切，需要恢复上一次剪切的数据
      restorePreCutData(state);
      copyData(state);

      state.componentData.splice(state.curComponentIndex, 1);

      state.isCut = true;

      return {
        ...state,
      };
    }

    case ActionTypes.ShowContextMenu: {
      const { top, left } = action.payload as ContextMenuInfo;
      state.menuShow = true;
      state.menuTop = top;
      state.menuLeft = left;
      return {
        ...state,
      };
    }

    case ActionTypes.HideContextMenu: {
      return {
        ...state,
        menuShow: false,
      };
    }

    // 动画相关
    case ActionTypes.AddAnimation: {
      if (state.curComponent) {
        state.curComponent.animations.push(action.payload);
      }

      return {
        ...state,
      };
    }

    case ActionTypes.EditAnimation: {
      const { index, animate } = action.payload as EditAnimationPayload;
      if (state.curComponent) {
        state.curComponent.animations[index] = {
          ...state.curComponent.animations[index],
          ...animate,
        };
      }
      return {
        ...state,
      };
    }

    case ActionTypes.DeleteAnimation: {
      const index = action.payload as number;
      if (state.curComponent) {
        state.curComponent.animations.splice(index, 1);
      }
      return {
        ...state,
      };
    }

    // 事件相关
    case ActionTypes.Addevent: {
      const { event, param } = action.payload as AddEventPayload;
      if (state.curComponent) {
        state.curComponent.events[event] = param;
      }
      return {
        ...state,
      };
    }

    case ActionTypes.RemoveEvent: {
      const { event } = action.payload as AddEventPayload;
      if (state.curComponent) {
        delete state.curComponent.events[event];
      }
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default editorReducer;
