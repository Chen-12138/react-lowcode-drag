import { CanvasStyleData } from "../reducers/editor";

export enum ActionTypes {
  // 设置画布属性
  SetCanvasStyleData = "SetCanvasStyleData",
}

export interface Action {
  type: ActionTypes;
  payload: CanvasStyleData;
}
