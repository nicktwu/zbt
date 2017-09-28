/**
 * Created by nwu on 9/27/17.
 */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginWithForm, loginWithCertificate, logout} from '../redux/session/actions';
import {HOME, LOGIN} from './paths';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import {ContentRouter} from './content';
import {Sidebar} from './sidebar';

function mapStateToProps(state) {
  return {
    ready: state.ready,
    token: state.session.token,
    certificateMessage: state.session.certificateMessage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginWithForm: loginWithForm(dispatch),
    loginWithCertificate: loginWithCertificate(dispatch),
    logout: logout(dispatch)
  }
}

class SessionRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={LOGIN}>
            { this.props.token ? <Redirect to={HOME}/> :
            <LoginPage loginWithCertificate={this.props.loginWithCertificate}
                       loginWithForm={this.props.loginWithForm}/> }
          </Route>
          <Route>
            { this.props.token ?
            <Dashboard logout={this.props.logout} sidebar={Sidebar}>
              <ContentRouter />
            </Dashboard> : <Redirect to={LOGIN}/>}
          </Route>
        </Switch>
      </Router>
    )
  }
}

let ConnectedRouter = connect(mapStateToProps, mapDispatchToProps)(SessionRouter);
export default ConnectedRouter