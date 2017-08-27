import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter, Redirect } from 'react-router-dom';

import HeaderNav from './components/HeaderNav';
import CalendarView from './components/CalendarView';
import ProfileView from './components/ProfileView';

import './index.css';

const RouterHeaderNav = withRouter(({location}) => <HeaderNav location={location}/>);

export default class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="Site">
          <header><RouterHeaderNav/></header>
          <div className="Site-content">
            <Route exact path="/" render={() => <Redirect to="/profile/"/>} />
            <Route path="/profile/" component={ProfileView} />
          </div>
          <footer>ZBTodo App</footer>
        </div>
      </BrowserRouter>
    );
  }
}
