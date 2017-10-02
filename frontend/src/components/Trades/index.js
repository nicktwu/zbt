/**
 * Created by nwu on 10/1/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../redux/user/actions';
import Typography from 'material-ui/Typography'
import {Paper, withStyles} from 'material-ui';

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
          <Typography type="caption">
            {this.props.user.current ? "Current Zebe":""}{this.props.user.president ? ", President":""}{this.props.user.rush_chair ? ", Rush Chair":""}{this.props.user.midnight_maker ? ", Midnight Maker":""}{this.props.user.house_chair ? ", House Chair":""}{this.props.user.social_chair ? ", Social Chair":""}{this.props.user.workweek_chair ? ", Workweek Chair":""}{this.props.user.tech_chair ? ", Tech Chair":""}{this.props.user.dev ? ", Developer":""}
          </Typography>
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