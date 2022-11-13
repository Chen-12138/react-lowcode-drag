import { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { ComponentListItem } from "../custom-component/component-list";
import {
  ActionTypes,
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

    recordSnapShot(component: ComponentListItem) {
      dispatch({
        type: ActionTypes.RecordSnapShot,
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
  };
}
