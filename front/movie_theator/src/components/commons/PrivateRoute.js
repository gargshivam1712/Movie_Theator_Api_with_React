import React from "react"
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"

const PrivateRoute=({component:Component,auth,...rest})=>{
    
    return <Route {...rest}
    render = {
        props=>{
            if(auth.loading)
            return <p>loading...</p>
            
            else if(!auth.isAuthenticated){
                return <Redirect to = {
                    {
                        pathname:"/login",
                        state:{from:props.location}
                    }
                    
                }
                  />
            }
            else
            return <Component {...props}/>
        }
    }
    />
}

const mapStatetoProps = (state)=>({
    auth: state.auth
})

export default connect(mapStatetoProps)(PrivateRoute)