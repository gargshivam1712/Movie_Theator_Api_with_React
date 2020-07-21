import React, { Component , Fragment } from 'react'
import PropTypes from 'prop-types'
import {confirm} from "../actions/auth"
import {connect} from "react-redux"
import { Link } from 'react-router-dom'
import { FlushMessageDanger,FlushMessageSuccess } from './FlushMessage'

class EmailConfirmation extends Component {
    static propTypes = {
        confirm : PropTypes.func.isRequired,
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
        this.props.confirm(this.props.match.params.token).catch(()=>this.setState({
            error:true
        }))
    }

    render() {
        return (
            <Fragment>
                {this.state.error? <FlushMessageDanger message="your link is invalid"/>:
                    
                <div><FlushMessageSuccess message ="Welcome to movie theator your registration is successfully" />
                    <Link to = "/">Dashboard</Link></div>}
            </Fragment>
        )
    }
}

export default connect(null,{confirm})(EmailConfirmation)