import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from '../messages/Message'
import { FlushMessageDanger } from '../messages/FlushMessage'

export default class RegisterForm extends Component {
    state={
        data:{
            username:'',
            password:'',
            name : '',
            email:'',
            phone_no:'',
            confirm_password:''
        },
        loading:false,
        error:{}
    }

    onChange=(e)=>{
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        })
    }

    onSubmit=(e)=>
    {
        e.preventDefault()
        const error = this.validate(this.state.data)
        this.setState({ error:error });
        if (Object.keys(error).length===0)
        {
            this.setState({loading:true})
            this.props.submit(this.state.data)
            .catch(err=>{
                console.log(err.response)
                error.global = err.response.data.message
                console.log(err.response.data.message)
                this.setState({error:error,loading:false})})
        }
    }

    validate = (data)=>{
        const error = {};
        if (!data.username) error.username="Username Must be required"
        if (!data.name) error.name="Name Must be required"
        if (!data.email) error.email="Email Must be required"
        if (!data.phone_no) error.phone_no="Phone No Must be required"
        if (!data.confirm_password) error.confirm_password="Confirm Password Must be required"
        if (!data.password) error.password="Password Must be required"
        if (data.password!==data.confirm_password) error.confirm_password="Confirm Password Must be same as Password"
        return error;
    }

    render()
    {
        const {data,error} = this.state;
        return (
            <form  onSubmit={this.onSubmit} >
                 {
                    error.global && <FlushMessageDanger message={error.global} /> 
                }
                <div className='from-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' placeholder='UserName' value={data.username} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.username}/>
                <div className='from-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' placeholder='Name' value={data.name} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.name}/>
                <div className='from-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' placeholder='Email' value={data.email} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.email}/>
                <div className='from-group'>
                    <label htmlFor='phone_no'>Phone No</label>
                    <input type='phone_no' name='phone_no' id='phone_no' placeholder='Phone No' value={data.phone_no} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.phone_no}/>
                <div className='from-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='Password' value={data.password} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.password}/>
                <div className='from-group'>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input type='password' name='confirm_password' id='confirm_password' placeholder='Confirm Password' value={data.confirm_password} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.confirm_password}/>
                
                <p><input type='submit' className='btn btn-primary' name='submit' /></p>
                
                
            </form>
        )
    }
}

RegisterForm.propTypes = {
    submit : PropTypes.func.isRequired
}