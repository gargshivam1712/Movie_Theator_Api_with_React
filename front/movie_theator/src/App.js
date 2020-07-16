import React,{Fragment,Component} from 'react';
import Home from "./components/Home"
import {Route,Switch} from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import {connect} from "react-redux"
import {userLoading} from "./actions/user"
import PrivateRoute from './components/commons/PrivateRoute'
import Contact from "./pages/Contact"
import Register from './pages/Register'



class App extends Component {
  componentDidMount=()=>{
    this.props.userLoading()
  }

  state = {
    login:false
  }
  
  render(){
    return(
      <Fragment>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/login' exact component={Login}/>
          <PrivateRoute path='/contact' exact component = {Contact}/>
          <Route path='/register' exact component={Register}/>
        </Switch>
        
      </Fragment>
    )
  }
}

export default connect(null,{userLoading})(App);
