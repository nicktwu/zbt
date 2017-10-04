/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../../redux/user/actions';
import {Divider, Typography} from 'material-ui';
import {Paper, withStyles} from 'material-ui';

function mapStateToProps(state) {
  return {
    token: state.session.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: getCurrent(dispatch)
  }
}

const style = theme => ({
  paper: {
    marginTop: theme.spacing.unit*3,
    padding: theme.spacing.unit*3,
  },
  title: {
    marginTop: theme.spacing.unit*2,
  }
});


class Admin extends Component {

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getCurrentUser) {
      props.getCurrentUser(props.token)
    }
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography type="headline" gutterBottom>Midnight Maker Admin Panel</Typography>
        <Divider/>
      </Paper>
    )
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));

export {Connected as MidnightMaker}