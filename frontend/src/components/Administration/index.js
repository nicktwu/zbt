/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../redux/user/actions';
import {withStyles} from 'material-ui';
import {PresidentAdmin} from './PresidentAdmin';
import {RushAdmin} from './RushAdmin';
import {MidnightMaker} from './MidnightMakerAdmin';
import {ChangePassword} from './ChangePasswordForm';

function mapStateToProps(state) {
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
  panelContainer: {
  }
});


class Admin extends Component {

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getCurrentUser) {
      props.getCurrentUser(props.token);
    }
  }

  render() {
    if (this.props.user) {
      return (
        <div className={this.props.classes.panelContainer}>
          <ChangePassword user={this.props.user}/>
          { this.props.user.president || this.props.user.tech_chair ? <PresidentAdmin token={this.props.token}/> : null}
          { this.props.user.rush_chair || this.props.user.president || this.props.user.tech_chair ? <RushAdmin/> : null}
          { this.props.user.president || this.props.user.tech_chair || this.props.user.midnight_maker ? <MidnightMaker/> : null}
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
}

let ConnectedAdmin = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));

export {ConnectedAdmin as Administration}