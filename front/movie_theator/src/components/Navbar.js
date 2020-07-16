import React, { Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../actions/user'
import PropTypes from 'prop-types'


class Navbar extends Component {

    onClick = ()=>{
        this.props.logout()
    }

    render() {
        const {isAuthenticated} = this.props.auth
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <a className="navbar-brand" href="#">Movie Theator</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/contact' className='nav-link'>Contact</Link>
                    </li>
                </ul>
                <ul className="navbar-nav justify-content-end">
                    <li className="nav-item">
                    {
                       isAuthenticated?(
                           <button className="btn btn-primary" onClick={this.onClick}>Logout</button>
                        
                       ):
                       (
                        <Link to='/login' className='nav-link'>Login</Link>
                       )
                    }
                    </li>
                </ul>
                </nav>
        )
    }
}

const mapStatetoProps=(state)=>({
    auth : state.auth
})

export default connect(mapStatetoProps,{logout})(Navbar)