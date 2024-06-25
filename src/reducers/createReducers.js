/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers, createStore} from "redux";

import authenticationReducer from "./authenticationReducer";
import themeReducer from "./themeReducer";


const rootReducer = combineReducers({
    authenticationReducer,
    themeReducer,
    // applyMiddleware(sagaMiddleware),
});
const store = createStore(rootReducer);

export default store;
