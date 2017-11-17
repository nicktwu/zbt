/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../redux/user/actions';
import {withStyles} from 'material-ui';
import {PresidentAdmin} from './PresidentAdmin';
import {MidnightMaker} from './MidnightMakerAdmin';
import {ChangePassword} from './ChangePasswordForm';
import {Loader} from '../Loader';


const style = theme => ({
  panelContainer: {
  }
});


class Admin extends Component {

  render() {
    return (
      <div className={this.props.classes.panelContainer}>
        <ChangePassword user={this.props.user}/>
        { this.props.user.president || this.props.user.tech_chair ? <PresidentAdmin/> : null}
        { this.props.user.president || this.props.user.tech_chair || this.props.user.midnight_maker ?
          <MidnightMaker/> : null}
      </div>
    )
  }
}

const StyledAdmin = withStyles(style)(Admin);


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

class AdminWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
    }
  }

  componentWillMount() {
    let props = this.props;
    this.setState({
      requests: Promise.all([
        props.getCurrentUser(props.token),
      ])
    })
  }

  render() {
    return (
      <Loader promise={this.state.requests}>
        <StyledAdmin user={this.props.user}/>
      </Loader>
    )
  }
}

let ConnectedAdmin = connect(mapStateToProps, mapDispatchToProps)(AdminWrapper);

export {ConnectedAdmin as Administration}