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
import {loginWithForm, loginWithCertificate, loginWithCookie, logout} from '../redux/session/actions';
import {HOME, LOGIN} from './paths';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import {ContentRouter} from './content';
import {Sidebar} from './sidebar';
import {withCookies} from 'react-cookie';

function mapStateToProps(state) {
  return {
    ready: state.ready,
    token: state.session.token,
    certificateMessage: state.session.certificateMessage,
    formMessage: state.session.formMessage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginWithForm: loginWithForm(dispatch),
    loginWithCertificate: loginWithCertificate(dispatch),
    logout: logout(dispatch),
    presentToken: loginWithCookie(dispatch),
  }
}

class SessionRouter extends Component {
  render() {
    if (this.props.cookies && this.props.cookies.get("zbtodo-token", {path: "/"})) {
      let token = this.props.cookies.get("zbtodo-token", {path: "/"});
      this.props.presentToken(token);
      this.props.cookies.set("zbtodo-token", "", {path: "/"});
    }
    return (
      <Router>
        <Switch>
          <Route path={LOGIN}>
            { this.props.token ? <Redirect to={HOME}/> :
            <LoginPage loginWithCertificate={this.props.loginWithCertificate}
                       loginWithForm={this.props.loginWithForm}
                       certMessage={this.props.certificateMessage}
                       formMessage={this.props.formMessage}/> }
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

let ConnectedRouter = connect(mapStateToProps, mapDispatchToProps)(withCookies(SessionRouter));
export default ConnectedRouter