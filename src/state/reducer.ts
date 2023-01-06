import { combineReducers } from "redux";
import editor, { EditorState } from "./reducers/editor";
import user, { UserState } from "./reducers/user";
export interface State {
  editor: EditorState;
  user: UserState;
}

export default combineReducers({
  editor,
  user,
});
