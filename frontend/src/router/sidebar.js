/**
 * Created by nwu on 9/28/17.
 */
import React, {Component} from 'react';
import List from 'material-ui/List';
import {SidebarItem} from '../components/Sidebar';
import {Route, Link} from 'react-router-dom';
import { internalPaths } from './paths';

class Sidebar extends Component {
  render() {
    return (
      <List>
        { internalPaths.map((entry, index) => {
          return (
            <SidebarLink key={index} path={entry.path} exact={entry.exact}
                         text={entry.text} icon={entry.icon}/>
          )
        })}
      </List>
    )
  }
}

class SidebarLink extends Component {
  render() {
    return (
      <Route path={this.props.path} exact={this.props.exact} children={({match}) => {
        return (
          <Link to={this.props.path} style={{textDecoration:"none"}}>
            <SidebarItem selected={!!match} exact path={this.props.path} text={this.props.text} icon={this.props.icon}/>
          </Link>
        )
      }}/>
    )
  }
}

export {Sidebar};