/**
 * Created by nwu on 10/1/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../redux/user/actions';
import {Paper, Divider, Typography, withStyles} from 'material-ui';

function mapStateToProps(state) {
  console.log(state);
  return {
    token: state.session.token,
    user: state.user.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: getCurrent(dispatch)
  }
}

const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
  }
});


class Trades extends Component {

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getCurrentUser) {
      props.getCurrentUser(props.token)
    }
  }

  render() {
    if (this.props.user) {
      return (
        <Paper className={this.props.classes.paper}>
          <Typography type="headline" gutterBottom>Trading</Typography>
          <Divider/>
        </Paper>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
}

let ConnectedTrades = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Trades));

export {ConnectedTrades as Trades}