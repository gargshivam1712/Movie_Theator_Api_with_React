import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'

import {logout} from "../actions/auth"

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <a className="navbar-brand" href="/">Movie Theator</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/contact' className='nav-link'>Contact</Link>
                    </li>
                </ul>{
                    !this.props.isAuthenticated?
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <Link to='/login' className='nav-link'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register' className='nav-link'>Register</Link>
                        </li>
                    </ul>:
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <button onClick = {this.props.logout} className="btn btn-primary">Logout</button>
                        </li>
                    </ul>
                }

                </nav>
        )
    }
}

const mapStatetoProps = (state)=>({
    isAuthenticated : state.auth.isAuthenticated
})

Navbar.protoType = {
    isAuthenticated : PropTypes.bool.isRequired
}

export default connect(mapStatetoProps,{logout})(Navbar)