import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import PasswordChangeForm from "../form/PasswordChangeForm"
import {connect} from "react-redux"
import {password_change} from "../actions/auth"
import { Link } from 'react-router-dom'

class PasswordChange extends Component {
    static propTypes = {
        prop: PropTypes
    }

    state = {
        success:false
    }

    submit=data=>this.props.password_change(data).then(()=>this.setState({
        success:true
    }))

    render() {
        return (
            <Fragment>
                {this.state.success && <div className="container alert alert-success"> 
                Password Change Successfully
                    </div>}

                {
                    this.state.success?<div>
                        Login your account  <Link to='/login'>Login</Link>
                    </div>:<div>
                    Password
                    <PasswordChangeForm submit={this.submit}/>
    
                    </div>
                }    
                
            </Fragment>
            
        )
    }
}

export default connect(null,{password_change})(PasswordChange)