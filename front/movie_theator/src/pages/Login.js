import React, { Component } from 'react'
import LoginForm from "../form/LoginForm"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {login} from '../actions/user'


class Login extends Component {

    submit = data=>{
        console.log(data)   
        this.props.login(data)
    }
    render() {
        console.log(this.props)
        let redirect = '/'
        if (this.props.history.location.state){
            redirect=this.props.history.location.state.from.pathname
        }
        if(this.props.auth.isAuthenticated)
        return (<Redirect to={redirect} />)
        
        else
        return (
            <div className="container" >
                Login Form<br/><br/>
                <LoginForm submit = {this.submit}/>
            </div>
        )
    }
}

const mapStatetoProps=(state)=>({
    auth:state.auth
})


export default connect(mapStatetoProps,{login})(Login)
