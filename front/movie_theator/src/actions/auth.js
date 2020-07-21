import { USER_LOADED,USER_LOADING,AUTH_ERROR,LOGIN_SUCCESS,LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_CONFIRM, FORGET_PASSWORD_SUCCESS ,PASSWORD_CHANGE_SUCCESS} from '../types/user'
import { user } from '../api/user'
import axios from "axios"

export const loggedin = (data)=>dispatch=>{
    dispatch({
        type:LOGIN_SUCCESS,
        payload:data
    })
}


export const login=(credential)=>(dispatch)=>user.login(credential).then(data =>dispatch(loggedin(data)))

export const profile =()=>(dispatch,getState)=>{
    dispatch({
        type:USER_LOADING
    })

    const token = localStorage.getItem('token')
    console.log(token)
    const config = {
        'headers':{
            'Content-types':'application/json'
        }
    }
    if(token){
        config.headers['x-access-token']=token
    }

    axios.get('/profile',config)
    .then((res)=>{
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    })
    .catch(()=>{
        dispatch({
            type:AUTH_ERROR
        })
    })

}

export const logout = ()=>(dispatch)=>{
    dispatch({
        type:LOGOUT_SUCCESS
    })
}

export const register = (data)=>(dispatch)=>user.register(data).then((data)=>{dispatch({
    type:REGISTER_CONFIRM,
    payload:data.token
})
const token = "http://localhost:3000/confirmation/"+data.token
console.log(token)
})


export const confirm = (token)=>dispatch=>{
    dispatch({
        type:USER_LOADING
    })
    console.log("token",token)
    const config = {
        'headers':{
            'Content-types':'application/json'
        }
    }
    if(token){
        config.headers['x-access-token']=token
    }
    console.log(config)
    return axios.get('/confirm',config)
    .then(res=>{
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
    })
    
}

export const forget_confirm = (token)=>dispatch=>{
    dispatch({
        type:USER_LOADING
    })
    console.log("token",token)
    const config = {
        'headers':{
            'Content-types':'application/json'
        }
    }
    if(token){
        config.headers['x-access-token']=token
    }
    console.log(config)
    return axios.get('/forget_confirm',config)
    .then(res=>{
        dispatch({
            type:FORGET_PASSWORD_SUCCESS,
            payload:res.data
        })
    })
    
}

export const password_change = (data)=>(dispatch,getState)=>{
    

    const token = localStorage.getItem('password_token')
    const config = {
        'headers':{
            'Content-types':'application/json'
        }
    }
    if(token){
        config.headers['x-access-token']=token
    }
    console.log(config)
    return axios.post('/password_change',data,config)
    .then(res=>{
        dispatch({
            type:PASSWORD_CHANGE_SUCCESS
        })
    })
    
}