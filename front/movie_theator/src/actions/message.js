import {ERROR_MESSAGE,SUCCESS_MESSAGE} from '../types/message'

export const errorMessage = (error)=>(dispatch)=>{
    dispatch({
        type:ERROR_MESSAGE,
        payload:error
    })
}

export const successMessage = (success) = (dispatch)=>{
    dispatch({
        type:SUCCESS_MESSAGE,
        payload:success
    })
}