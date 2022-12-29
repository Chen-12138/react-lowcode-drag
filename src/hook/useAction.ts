import { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { ComponentListItem } from "../custom-component/component-list";
import {
  ActionTypes,
  ContextMenuInfo,
  SetCurComponentPayload,
} from "../state/constants/actionTypes";

/**
 * 将dispath action 写成一个hook吧，dispath代码太多了，而且不好看
 */
export default function useAction() {
  const dispatch = useDispatch();

  return {
    setEditor(editor: any) {
      dispatch({
        type: ActionTypes.SetEditor,
        payload: editor,
      });
    },

    addComponent(component: ComponentListItem) {
      dispatch({
        type: ActionTypes.AddComponent,
        payload: component,
      });
    },

    setCurComponent({
      curComponent,
      curComponentIndex,
    }: SetCurComponentPayload) {
      dispatch({
        type: ActionTypes.SetCurComponent,
        payload: {
          curComponent,
          curComponentIndex,
        },
      });
    },

    setWrapStyle(stlyes: any) {
      dispatch({
        type: ActionTypes.SetWrapStyle,
        payload: stlyes,
      });
    },

    setClickComponentStatus(status: boolean) {
      dispatch({
        type: ActionTypes.SetClickComponentStatus,
        payload: status,
      });
    },

    setComponetData(componentData: ComponentListItem[]) {
      dispatch({
        type: ActionTypes.SetComponentData,
        payload: componentData,
      });
    },

    setComponentStyle(style: CSSProperties) {
      dispatch({
        type: ActionTypes.SetComponentStyle,
        payload: style,
      });
    },

    setComponentContent(content: string) {
      dispatch({
        type: ActionTypes.SetComponentContent,
        payload: content,
      });
    },

    deleteComponent(index?: number) {
      dispatch({
        type: ActionTypes.DeleteComponent,
        payload: index,
      });
    },

    upComponent() {
      dispatch({
        type: ActionTypes.UpComponent,
      });
    },

    downComponent() {
      dispatch({
        type: ActionTypes.DownComponent,
      });
    },

    topComponent() {
      dispatch({
        type: ActionTypes.TopComponent,
      });
    },

    bottomComponent() {
      dispatch({
        type: ActionTypes.BottomComponent,
      });
    },

    updateComponentPropValue(propValue: string) {
      dispatch({
        type: ActionTypes.UpdateComponentPropValue,
        payload: propValue,
      });
    },

    recordSnapshot() {
      dispatch({
        type: ActionTypes.RecordSnapshot,
      });
    },

    undo() {
      dispatch({
        type: ActionTypes.Undo,
      });
    },

    redo() {
      dispatch({
        type: ActionTypes.Redo,
      });
    },

    copy() {
      dispatch({
        type: ActionTypes.Copy,
      });
    },

    paste(isMouse?: boolean) {
      dispatch({
        type: ActionTypes.Paste,
        payload: isMouse,
      });
    },

    cut() {
      dispatch({
        type: ActionTypes.Cut,
      });
    },

    showContextMenu(info: ContextMenuInfo) {
      dispatch({
        type: ActionTypes.ShowContextMenu,
        payload: info,
      });
    },

    hideContextMenu() {
      dispatch({
        type: ActionTypes.HideContextMenu,
      });
    },

    clearCanvas() {
      console.log("clear");
      dispatch({
        type: ActionTypes.SetComponentData,
        payload: [],
      });
      dispatch({
        type: ActionTypes.SetCurComponent,
        payload: {
          curComponent: null,
          curComponentIndex: null,
        },
      });
      dispatch({
        type: ActionTypes.RecordSnapshot,
      });
    },
  };
}
