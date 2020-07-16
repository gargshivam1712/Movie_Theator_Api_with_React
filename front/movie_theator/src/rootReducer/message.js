import {ERROR_MESSAGE,SUCCESS_MESSAGE} from '../types/message'

const initialState = {
    error : {},
    message:{}
}

export const messageReducer = (state=initialState,action)=>{
    switch(action.type){
        case ERROR_MESSAGE:
            return {
                ...state,
                error:action.payload
            }
        case SUCCESS_MESSAGE:
            return {
                ...state,
                message:action.payload
            }
        default: return state
    }
}