import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RegisterForm from '../form/RegisterForm'

export default class Register extends Component {

    submit=(data)=>{
        console.log(data)
    }

    render(){
        return(
            <div className="container">
                <h1>Register Form</h1>
                <RegisterForm submit = {this.submit}/>
            </div>
        )
    }
}
