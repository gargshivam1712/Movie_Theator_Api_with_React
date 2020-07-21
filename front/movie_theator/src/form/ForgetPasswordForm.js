import React ,{Component} from "react";
import Message from "../messages/Message";

import PropTypes from 'prop-types'
import { FlushMessageDanger } from '../messages/FlushMessage'


class ForgetPasswordForm extends Component
{
    state={
        data:{
            email:''
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
                error.global = err.response.data.message
                console.log(err.response.data.message)
                this.setState({error:error,loading:false})})
        }
            
    }

    validate = (data)=>{
        const error = {};
        if (!data.email) error.email="Email Must be required"
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
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' placeholder='Email' value={data.email} onChange={this.onChange} className='form-control'/>
                </div>
                <Message message={error.email}/>
                <p><input type='submit' className='btn btn-primary' name='submit' /></p>
            </form>
        )
    }
}



ForgetPasswordForm.propTypes = {
    submit : PropTypes.func.isRequired
}

export default ForgetPasswordForm