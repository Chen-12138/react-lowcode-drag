import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
// import thunk from "redux-thunk"; //引入redux-thunk，用于支持异步action
import logger from "redux-logger";

const store = createStore(reducer, applyMiddleware(logger));

export default store;
