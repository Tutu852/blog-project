import { combineReducers } from "redux";

import authReducer from "../slices/authSlice"
import blogReducer from "../slices/blogSlice" 

const rootReducer = combineReducers({
    auth : authReducer,
    blog:blogReducer
})

export default rootReducer