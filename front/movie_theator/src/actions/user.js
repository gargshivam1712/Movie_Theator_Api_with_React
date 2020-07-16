import {USER_LOADED,USER_LOADING,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../types/user"
import {ERROR_MESSAGE,SUCCESS_MESSAGE} from "../types/message"
import axios from "axios"

export const userLoading = ()=>(dispatch,getState)=>{
    // token check
    let token = null
    dispatch({
        type:USER_LOADING
    })
    token = getState().auth.token
    
    if (token)
    {
        const config = {
            'headers':{
                'Content-Type':'application/json',
                'x-access-token':token
            }
        }
        axios.get('/profile',config)
        .then((res)=>{
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        })
        .catch(error=>{
            const errorMessage = {
                message:error.response.data,
                statusCode : error.response.status,
                statusText : error.response.statusText
            }
            dispatch({
                type:ERROR_MESSAGE,
                payload:errorMessage
            })
            dispatch({
                type:AUTH_ERROR
            })
        })
    }
    else
    {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

export const login=(data)=>(dispatch)=>{
    dispatch({
        type:USER_LOADING
    })
    
        axios.post('/login',{},{
            auth:{
                username:data['username'],
                password:data['password']
            }
        })
        .then((res)=>{
            const successMessage={
                message:"Login successfully",
                statusCode:res.status,
                statusText:res.statusText
            }
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            dispatch({
                type:SUCCESS_MESSAGE,
                payload:successMessage
            })
        })
        .catch(error=>{
            console.log(error)
            const errorMessage = {
                message:     error.response.data,
                statusCode : error.response.status,
                statusText : error.response.statusText
            }
            dispatch({
                type:LOGIN_FAIL
            })
            dispatch({
                type:ERROR_MESSAGE,
                payload:errorMessage
            })
            
        })
}

export const logout=()=>(dispatch,getState)=>{
    // token check
    let token = null
    dispatch({
        type:USER_LOADING
    })
    token = getState().auth.token
    
    if (token)
    {
        const config = {
            'headers':{
                'Content-Type':'application/json',
                'x-access-token':token
            }
        }
        axios.get('/logout',config)
        
        .then((res)=>{
            const successMessage={
                message:"Logout successfully",
                statusCode:res.status,
                statusText:res.statusText
            }
            dispatch({
                type:LOGOUT_SUCCESS,
                payload:res.data
            })
            dispatch({
                type:SUCCESS_MESSAGE,
                payload:successMessage
            })
        })
        .catch(error=>{
            const errorMessage = {
                message:error.response.data,
                statusCode : error.response.status,
                statusText : error.response.statusText
            }
            dispatch({
                type:ERROR_MESSAGE,
                payload:errorMessage
            })
        })
    }
    else
    {
        dispatch({
            type:AUTH_ERROR
        })
    }
}