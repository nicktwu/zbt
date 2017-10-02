/**
 * Created by nwu on 9/28/17.
 */
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {internalPaths} from './paths';

export class ContentRouter extends Component {
  render() {
    return (
      <Switch>
        { internalPaths.map((entry, idx) => {
          return (
            <Route key={idx} path={entry.path} exact={entry.exact} component={entry.component}/>
          )
        }) }
      </Switch>
    )
  }
}