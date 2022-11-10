import { ComponentListItem } from "../../custom-component/component-list";
import { CanvasStyleData } from "../reducers/editor";

export enum ActionTypes {
  // 设置Editor
  SetEditor = "SetEditor",
  // 设置画布属性
  SetCanvasStyleData = "SetCanvasStyleData",
  // 添加组件
  AddComponent = "AddComponent",
  // 记录快照
  RecordSnapShot = "RecordSnapShot",
  // 设置当前组件
  SetCurComponent = "SetCurComponent",
  // 设置为点击组件状态
  SetClickComponentStatus = "SetClickComponentStatus",
  // 设置包裹组件样式
  SetWrapStyle = "SetWrapStyle",
  // 设置componentData
  SetComponentData = "SetComponentData",
}

export interface SetCurComponentPayload {
  curComponent: ComponentListItem | null;
  curComponentIndex: number | null;
}

export interface Action {
  type: ActionTypes;
  payload:
    | CanvasStyleData
    | ComponentListItem
    | SetCurComponentPayload
    | ComponentListItem[]
    | boolean;
}
