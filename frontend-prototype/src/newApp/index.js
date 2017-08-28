import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter, Redirect } from 'react-router-dom';

import HeaderNav from './components/HeaderNav';
import CalendarView from './components/CalendarView';
import ProfileView from './components/ProfileView';

import * as config from './config.js';
import makeStore from './redux.js';

import 'font-awesome/css/font-awesome.css';
import './index.css';

const RouterHeaderNav = withRouter(({location}) => <HeaderNav location={location}/>);

const store = makeStore();
store.dispatch({
  type: 'AUTH_INIT',
  url: config.getAuthUrl(),
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename="/">
          <div className="Site">
            <header><RouterHeaderNav/></header>
            <div className="Site-content">
              <Route exact path="/" render={() => <Redirect to="/profile/"/>} />
              <Route exact path="/profile/" component={ProfileView} />
              <Route path="/:reqType/" component={CalendarView} />
            </div>
            <footer>ZBTodo App</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
