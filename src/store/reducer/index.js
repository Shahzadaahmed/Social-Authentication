// Note: Main Reducer File...!

import { combineReducers } from "redux";
import authReducer from "./auth-reducer";

const rootReducer = combineReducers({
    users: authReducer
});

export default rootReducer;