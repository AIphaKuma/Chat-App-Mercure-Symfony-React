import { combineReducers } from "@reduxjs/toolkit";
import SessionReducer from "./SessionReducer";
import SigninReducer from "./SigninReducer";


export const RootReducer = combineReducers({
    SessionReducer,
    SigninReducer,
})