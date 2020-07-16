import React ,{Component} from "react";
import Message from "../messages/Message";
import {connect} from 'react-redux'



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
        {
            this.props.submit(this.state.data);
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

const mapStatetoProps=(state)=>({
    auth:state.auth
})

export default connect(mapStatetoProps,{})(LoginForm);