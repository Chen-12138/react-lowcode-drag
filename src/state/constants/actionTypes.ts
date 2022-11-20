import { ComponentListItem } from "../../custom-component/component-list";
import { AnimationItem } from "../../utils/animationClassData";
import { CanvasStyleData } from "../reducers/editor";

export enum ActionTypes {
  // 设置Editor
  SetEditor = "SetEditor",
  // 设置画布属性
  SetCanvasStyleData = "SetCanvasStyleData",
  // 添加组件
  AddComponent = "AddComponent",
  // 设置当前组件
  SetCurComponent = "SetCurComponent",
  // 设置为点击组件状态
  SetClickComponentStatus = "SetClickComponentStatus",
  // 设置包裹组件样式
  SetWrapStyle = "SetWrapStyle",
  // 设置componentData
  SetComponentData = "SetComponentData",
  // 设置组件样式
  SetComponentStyle = "SetComponentStyle",
  // 删除组件
  DeleteComponent = "DeleteComponent",
  // 上移组件
  UpComponent = "UpComponent",
  // 下移组件
  DownComponent = "DownComponent",
  // 置顶组件
  TopComponent = "TopComponent",
  // 置底组件
  BottomComponent = "BottomComponent",
  // 更新组件属性
  UpdateComponentPropValue = "UpdateComponentPropValue",
  // 记录快照
  RecordSnapshot = "RecordSnapshot",
  // 撤销
  Undo = "Undo",
  // 撤销撤销
  Redo = "Redo",
  // 复制
  Copy = "Copy",
  // 粘贴
  Paste = "Paste",
  // 剪切
  Cut = "Cut",
  // 显示右键菜单
  ShowContextMenu = "ShowContextMenu",
  // 隐藏右键菜单
  HideContextMenu = "HideContextMenu",

  // 动画相关
  // 添加动画
  AddAnimation = "AddAnimation",
  // 编辑动画
  EditAnimation = "EditAnimation",
  // 删除动画
  DeleteAnimation = "DeleteAnimation",
}

export interface SetCurComponentPayload {
  curComponent: ComponentListItem | null;
  curComponentIndex: number | null;
}

export interface ContextMenuInfo {
  top: number;
  left: number;
}

export interface EditAnimationPayload {
  index: number;
  animate: AnimationItem;
}

export interface Action {
  type: ActionTypes;
  payload:
    | CanvasStyleData
    | ComponentListItem
    | SetCurComponentPayload
    | ComponentListItem[]
    | ContextMenuInfo
    | EditAnimationPayload
    | boolean
    | number
    | string;
}
