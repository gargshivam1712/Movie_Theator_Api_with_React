import {USER_LOADED,USER_LOADING,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS} from "../types/user"
import { REGISTER_CONFIRM,REGISTER_FAIL,REGISTER_SUCCESS,FORGET_PASSWORD_SUCCESS,PASSWORD_CHANGE_SUCCESS } from '../types/user'


const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated:false,
    loading:false,
    user : null,
    confirm :false
}

export const auth = (state=initialState,action)=>{
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                loading:true
            }

        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                loading:false,
                isAuthenticated:false,
                user:null
            }

            case PASSWORD_CHANGE_SUCCESS:
                localStorage.removeItem('password_token')
                return{
                    ...state,
                    token:null,
                    loading:false,
                    isAuthenticated:false,
                    user:null
                }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                token:localStorage.getItem('token'),
                isAuthenticated:true,
                loading:false,
                user:action.payload.user
            }
        
        case REGISTER_CONFIRM:
            localStorage.setItem('token',action.payload)
            return{
                ...state,
                confirm : true,
                token : localStorage.getItem('token')
            }
        case REGISTER_SUCCESS:
            localStorage.removeItem('token')
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                confirm : false,
                isAuthenticated:true,
                loading:false,
                token:localStorage.getItem('token'),
                user : action.payload.user
            }
        case FORGET_PASSWORD_SUCCESS:
            localStorage.setItem('password_token',action.payload.token)
            return {
                ...state,
                token : localStorage.getItem('password_token')
            }
        default:
            return state
    }
}