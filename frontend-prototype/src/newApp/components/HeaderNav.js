import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import './HeaderNav.css';

export default class HeaderNav extends Component {
  render() {
    const { location } = this.props;
    const { pathname } = location;

    const routes = {
      Midnights: '/midnights/',
      Workdays: '/workdays/',
      Social: '/social/',
      Commserve: '/commserve/',
    };

    const routesEls = Object.keys(routes).map(name => (
      <Link key={name} to={routes[name]} className={classnames({ active: routes[name] === pathname })}>
        {name}
      </Link>
    ));

    return (
        <div className="HeaderNav">{routesEls}</div>
    );
  }
}
