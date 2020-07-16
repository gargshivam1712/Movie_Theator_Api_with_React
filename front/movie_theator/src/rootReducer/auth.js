import {USER_LOADED,USER_LOADING,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS} from "../types/user"

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated:false,
    loading:false,
    user : null
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
            localStorage.removeItem('token')
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
        
        default:
            return state
    }
}