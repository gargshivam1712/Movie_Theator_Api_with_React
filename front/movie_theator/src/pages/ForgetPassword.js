import React, { Component } from 'react'

import ForgetPasswordForm from "../form/ForgetPasswordForm"

import axios from "axios"

class ForgetPassword extends Component {
    static propTypes = {
        
    }

    submit=(data)=>axios.post('/forget',data).then((res)=>{
        const token = "http://localhost:3000/forget_password_confirm/"+res.data.token
        console.log(token)
    })

    render() {
        return (
            <div className="container">
                forget Password
                <ForgetPasswordForm submit = {this.submit}/>
            </div>
        )
    }
}

export default ForgetPassword