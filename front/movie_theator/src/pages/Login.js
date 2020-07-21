import React, { Component } from 'react'
import LoginForm from "../form/LoginForm"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import { login } from '../actions/auth'



class Login extends Component {

    submit = data=>this.props.login(data)
    render() {
        console.log(this.props.isAuthenticated)
        if (this.props.isAuthenticated)
        {
            
           return <Redirect to="/"/>
        }
        return (
            <div className="container" >
                Login Form<br/><br/>
                <LoginForm submit = {this.submit}/>
            </div>
        )
    }
}

const mapStatetoProps = (state)=>({
    isAuthenticated : state.auth.isAuthenticated
})

Login.propTypes = {
    login : PropTypes.func.isRequired,
    histroy : PropTypes.shape({
        push:PropTypes.func.isRequired
    }),
    isAuthenticated : PropTypes.bool.isRequired
}




export default connect(mapStatetoProps,{login})(Login)