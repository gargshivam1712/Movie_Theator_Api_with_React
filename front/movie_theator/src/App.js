import React,{Fragment,Component} from 'react';
import Home from "./components/Home"
import {Route,Switch} from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import {connect} from "react-redux"
import PrivateRoute from './components/commons/PrivateRoute'
import Contact from "./pages/Contact"
import Register from './pages/Register'
import EmailConfirmation from "./messages/EmailConfirmation"
import ForgetPassword from "./pages/ForgetPassword"
import ForgetPasswordConfirmation from "./messages/ForgetPasswordConfirmation"
import PasswordChange from "./pages/PasswordChange"
import { FlushMessageSuccess } from './messages/FlushMessage'

import PropTypes from 'prop-types'


class App extends Component {
  
  state = {
    login:false
  }
  
  render(){
    return(
      <Fragment>
        <Navbar/>
        {this.props.confirm && <FlushMessageSuccess message="verify your emali" />}
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/login' exact component={Login}/>
          <PrivateRoute path='/contact' exact component = {Contact}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/confirmation/:token' exact component = {EmailConfirmation}/>
          <Route path="/forget_password" exact component = {ForgetPassword}/>
          <Route path='/forget_password_confirm/:token' exact component={ForgetPasswordConfirmation}/>
          <Route path="/password_change" exact component = {PasswordChange}/>
        </Switch>
      </Fragment>
    )
  }
}

const mapStatetoProps = (state)=>({
  confirm : state.auth.confirm
})

App.propTypes = {
confirm : PropTypes.bool.isRequired
}

export default connect(mapStatetoProps,{})(App);
