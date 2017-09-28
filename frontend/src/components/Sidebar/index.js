/**
 * Created by nwu on 9/27/17.
 */
import React, {Component} from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  active: {
    borderLeftWidth: "thick",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.primary[500],
    fontWeight: "bold",
  }
});

class SidebarItem extends Component {
  render() {
    let Icon = this.props.icon;
    return (
      <ListItem button className={this.props.selected ? this.props.classes.active : null}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={this.props.text}/>
      </ListItem>
    )
  }
}
let StyledSidebar = withStyles(styles)(SidebarItem);

export {StyledSidebar as SidebarItem}