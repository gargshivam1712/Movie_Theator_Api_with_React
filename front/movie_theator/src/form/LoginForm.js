import React ,{Component} from "react";
import Message from "../messages/Message";
import PropTypes from 'prop-types'
import { FlushMessageDanger } from '../messages/FlushMessage'

class LoginForm extends Component
{
    state={
        data:{
            username:'',
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
        if (!data.username) error.username="Username Must be required"
        if (!data.password) error.password="Password Must be required"
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
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='Password' value={data.password} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.password}/>
                <p><input type='submit' className='btn btn-primary' name='submit' /></p>
            </form>
        )
    }
}

LoginForm.propTypes = {
    submit : PropTypes.func.isRequired
}

export default LoginForm