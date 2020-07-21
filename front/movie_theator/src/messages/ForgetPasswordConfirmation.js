import React, { Component , Fragment } from 'react'
import PropTypes from 'prop-types'
import {forget_confirm} from "../actions/auth"
import {connect} from "react-redux"
import { Link } from 'react-router-dom'
import { FlushMessageDanger } from '../messages/FlushMessage'

class ForgetPasswordConfirmation extends Component {
    static propTypes = {
        forget_confirm : PropTypes.func.isRequired,
        match : PropTypes.shape({
            params : PropTypes.shape({
                token:PropTypes.string.isRequired
            })
        })
    }

    state = {
        error:false
    }

    componentDidMount(){
        this.props.forget_confirm(this.props.match.params.token).catch(()=>this.setState({
            error:true
        }))
    }

    render() {

        return (
            <Fragment>
                {this.state.error? <FlushMessageDanger message="your link is invalid" />:
                    
                <div>
                    <Link to = "/password_change">Password change</Link></div>}
                forget password 
            </Fragment>
        )
    }
}

export default connect(null,{forget_confirm})(ForgetPasswordConfirmation)