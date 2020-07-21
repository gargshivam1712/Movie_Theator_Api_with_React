import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RegisterForm from '../form/RegisterForm'
import { register } from '../actions/auth'
import {connect} from "react-redux"

class Register extends Component {

    submit=(data)=>this.props.register(data)

    render(){
        return(
            <div className="container">
                <h1>Register Form</h1>
                <RegisterForm submit = {this.submit}/>
            </div>
        )
    }
}

Register.propTypes = {
    register : PropTypes.func.isRequired
}


export default connect(null,{register})(Register)
