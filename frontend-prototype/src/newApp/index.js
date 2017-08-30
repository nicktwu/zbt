import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter, Redirect } from 'react-router-dom';

import HeaderNav from './components/HeaderNav';
import CalendarView from './components/CalendarView';
import ProfileView from './components/ProfileView';
import MidnightView from './components/MidnightView';

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

window.dispatch = store.dispatch.bind(store);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      authorized: false,
    };

    store.subscribe(() => {
      this.setState({
        authorized: !!store.getState().auth.token,
      });
    });
  }

  render() {
    const siteContent = (
      <div className="Site-content">
        <Route exact path="/" render={() => <Redirect to="/profile/"/>} />
          <Route exact path="/profile/" component={ProfileView} />
          <Route exact path="/midnights/:date/:task" component={MidnightView} />
          <Route exact path="/:type/" render={
                 ({match}) => <CalendarView type={match.params.type}/>} />
      </div>
    );

    const content = this.state.authorized ? siteContent : <div>Authorizing...</div>;

    return (
      <Provider store={store}>
        <BrowserRouter basename="/">
          <div className="Site">
            <header><RouterHeaderNav/></header>
            {content}
            <footer>ZBTodo App</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
