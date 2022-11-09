import { combineReducers } from "redux";
import editor, { EditorState } from './reducers/editor';

export interface State {
    editor: EditorState
};

export default combineReducers({
    editor
});
  