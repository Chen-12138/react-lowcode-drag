import { cloneDeep } from "lodash";
import { EditorState } from "../reducers/editor";

export const copyData = (state: EditorState) => {
  state.copyData = {
    data: cloneDeep(state.curComponent),
    index: state.curComponentIndex,
  };
};

// 恢复上一次剪切的数据
export const restorePreCutData = (state: EditorState) => {
  if (state.isCut && state.copyData) {
    const data = cloneDeep(state.copyData.data!);
    const index = state.copyData.index;
    state.componentData.splice(index, 0, data);
    console.log(state.componentData);
    if (state.curComponentIndex >= index) {
      state.curComponentIndex++;
    }
  }
};
