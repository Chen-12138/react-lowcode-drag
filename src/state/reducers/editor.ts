import { message } from "antd";
import { cloneDeep, find } from "lodash";
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
import {
  PageConfig,
  ProjectConfig,
  copyPage,
  getPageConfig,
} from "@/views/Editor/config";

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

  // 当前编辑器编辑工程项目数据
  projectData: ProjectConfig;
  // 当前正在编辑页面的uuid
  currentPageUUID: string;

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

  // 当前编辑器编辑工程项目数据
  projectData: {} as ProjectConfig,
  // 当前正在编辑页面的uuid
  currentPageUUID: "",

  menuTop: 0,
  menuLeft: 0,
  menuShow: false,

  snapshotData: [],
  snapshotIndex: -1,

  copyData: null,
  isCut: false,
};

const findCurrentPage = (state: EditorState) => {
  return (
    state.projectData?.pages?.find(
      (page) => page.uuid === state.currentPageUUID
    ) || ({} as PageConfig)
  );
};

const desecletComponent = (state: EditorState) => {
  state.curComponent = null;
  state.curComponentIndex = -1;
};

const editorReducer = (
  state: EditorState = editorInitialState,
  action: Action
): EditorState | undefined => {
  switch (action.type) {
    case ActionTypes.SetProjectData: {
      const projectData = action.payload as ProjectConfig;
      if (!state.currentPageUUID) {
        state.currentPageUUID = projectData.pages[0].uuid || "";
        state.componentData = findCurrentPage(state)?.componentData || [];
      }
      return {
        ...state,
        projectData,
      } as EditorState;
    }

    case ActionTypes.SetCurrentPageUUID: {
      state.currentPageUUID = action.payload as string;
      state.componentData = findCurrentPage(state).componentData;
      return {
        ...state,
      };
    }

    case ActionTypes.AddPage: {
      const uuid = action.payload;
      const data = getPageConfig();
      let index = -1;
      if (uuid) {
        index = state.projectData.pages.findIndex((page) => page.uuid === uuid);
      } else {
        index = state.projectData.pages.length - 1;
      }
      if (index === 0) {
        state.projectData.pages.push(data);
      } else {
        state.projectData.pages.splice(index, 0, data);
      }
      state.currentPageUUID = state.projectData.pages[index + 1].uuid || "";
      desecletComponent(state);
      return {
        ...state,
      };
    }

    case ActionTypes.DeletePage: {
      const uuid = action.payload;
      const data = getPageConfig();
      // 如果删除的为最后一页
      if (
        state.projectData.pages.length === 1 &&
        state.currentPageUUID === uuid
      ) {
        state.projectData.pages.push(data);
        state.currentPageUUID = data.uuid || "";
        state.projectData.pages.splice(0, 1);
      }
      const index = state.projectData.pages.findIndex(
        (page) => page.uuid === uuid
      );
      state.currentPageUUID =
        state.projectData.pages[index + 1]?.uuid ||
        state.projectData.pages[index - 1]?.uuid ||
        "";
      state.projectData.pages.splice(index, 1);
      desecletComponent(state);
      return {
        ...state,
      };
    }

    case ActionTypes.CopyPage: {
      const uuid = action.payload;
      let pageData = state.projectData.pages.find((page) => page.uuid === uuid);
      let data = copyPage(pageData);
      let index = -1;
      if (uuid) {
        index = state.projectData.pages.findIndex((page) => page.uuid === uuid);
      } else {
        index = state.projectData.pages.length - 1;
      }
      state.projectData.pages.splice(index, 0, data);
      desecletComponent(state);
      return {
        ...state,
      };
    }

    case ActionTypes.SetEditor: {
      return {
        ...state,
        editor: action.payload,
      } as EditorState;
    }

    case ActionTypes.SetCanvasStyleData: {
      const payload = action.payload as CanvasStyleData;
      state.projectData.canvasStyleData = {
        ...state.projectData.canvasStyleData,
        ...payload,
      };
      return {
        ...state,
      };
    }

    case ActionTypes.AddComponent: {
      let page = findCurrentPage(state);
      const component = action.payload as ComponentListItem;
      page?.componentData?.push(component);
      return {
        ...state,
      };
    }

    case ActionTypes.SetCurComponent: {
      const { curComponent, curComponentIndex } =
        action.payload as SetCurComponentPayload;
      state.curComponent = curComponent;
      state.curComponentIndex = curComponentIndex ?? -1;
      return {
        ...state,
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
      } as EditorState;
    }

    case ActionTypes.SetClickComponentStatus: {
      const status = action.payload as boolean;
      return {
        ...state,
        isClickComponent: status,
      } as EditorState;
    }

    case ActionTypes.SetComponentData: {
      const componentData = action.payload as ComponentListItem[];
      const page = findCurrentPage(state);
      page.componentData = componentData;
      return {
        ...state,
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
      } as EditorState;
    }

    case ActionTypes.SetComponentContent: {
      const curComponent = state.curComponent;
      const content = action.payload as string;
      if (curComponent) {
        curComponent.propValue = content;
      }

      return {
        ...state,
        curComponent,
      } as EditorState;
    }

    case ActionTypes.DeleteComponent: {
      const index = action.payload as number;
      const page = findCurrentPage(state);
      if (index === undefined) {
        page.componentData.splice(state.curComponentIndex, 1);
      } else {
        page.componentData.splice(index, 1);
      }
      return {
        ...state,
      };
    }

    case ActionTypes.UpComponent: {
      const { componentData } = findCurrentPage(state);
      const { curComponentIndex } = state;
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
      const { componentData } = findCurrentPage(state);
      const { curComponentIndex } = state;
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
      const { componentData } = findCurrentPage(state);

      if (state.curComponentIndex < componentData.length - 1) {
        componentData.splice(state.curComponentIndex, 1);
        componentData.push(state.curComponent!);
        state.curComponentIndex = componentData.length - 1;
      } else {
        message.info("已经到顶了");
      }
      return {
        ...state,
      };
    }

    case ActionTypes.BottomComponent: {
      const { componentData } = findCurrentPage(state);
      if (state.curComponentIndex > 0) {
        componentData.splice(state.curComponentIndex, 1);
        componentData.unshift(state.curComponent!);
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
      } as EditorState;
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
      findCurrentPage(state).componentData.push(data);

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

      findCurrentPage(state).componentData.splice(state.curComponentIndex, 1);

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
