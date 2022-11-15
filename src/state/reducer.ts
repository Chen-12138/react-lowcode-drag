import { combineReducers } from "redux";
import editor, { EditorState } from "./reducers/editor";
// import layer from "./reducers/layer";

export interface State {
  editor: EditorState;
}

export default combineReducers({
  editor,
});
