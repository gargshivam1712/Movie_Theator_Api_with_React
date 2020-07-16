import {combineReducers} from 'redux'
import {auth } from './auth'
import {messageReducer} from "./message"

export const rootReducer = combineReducers({
auth:auth,
message : messageReducer,

})