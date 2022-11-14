import { Action, ActionTypes } from "../constants/actionTypes";
import { EditorState, editorInitialState } from "./editor";
import { message } from "antd";

function swap(arr: any, left: number, right: number) {
  let t = arr[left];
  arr[left] = arr[right];
  arr[right] = t;
}

const layerReducer = (
  state: EditorState = editorInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.UpComponent: {
      console.log(state);
      const { componentData, curComponentIndex } = state;
      if (curComponentIndex) {
        // 上移图层 index，表示元素在数组中越往后
        if (curComponentIndex < componentData.length - 1) {
          swap(componentData, curComponentIndex, curComponentIndex + 1);
          state.curComponentIndex = curComponentIndex + 1;
        } else {
          message.info("已经到顶了");
        }
      }
      return {
        ...state,
        editor: action.payload,
      };
    }

    default:
      return state;
  }
};

export default layerReducer;