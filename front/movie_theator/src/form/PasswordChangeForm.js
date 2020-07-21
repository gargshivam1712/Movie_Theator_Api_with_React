import React ,{Component} from "react";
import Message from "../messages/Message";
import PropTypes from 'prop-types'
import { FlushMessageDanger } from '../messages/FlushMessage'

class PasswordChangeForm extends Component
{
    state={
        data:{
            confirm_password:'',
            password:''
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
        {   this.setState({loading:true})
            this.props.submit(this.state.data)
            .catch(err=>{
                
                error.global = err.response.data.message
                this.setState({error:error,loading:false})})
            
        }
    }

    validate = (data)=>{
        const error = {};
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

PasswordChangeForm.propTypes = {
    submit : PropTypes.func.isRequired
}

export default PasswordChangeForm