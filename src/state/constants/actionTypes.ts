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
}

export interface Action {
  type: ActionTypes;
  payload: CanvasStyleData | ComponentListItem;
}
