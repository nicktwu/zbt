import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MidnightTradingPanel from './MidnightTradingPanel';

import './MidnightView.css';

class MidnightView extends Component {
  componentDidMount() {
    this.props.fetchEvent();
  }

  render() {
    const { events, user, type } = this.props; //this is probably shit too

    return (
      <div className="MidnightView">
        <div className="MidnightInfoPanel">
          MIDNIGHT
        </div>

        <MidnightTradingPanel />
      </div>
    );
  }
}


const mapStateToProps = (state, {type}) => ({ ...state[type], user: state.user });
const mapDispatchToProps = (dispatch, {id}) => ({
  fetchEvent() {
    dispatch({
      types: ['LOAD_EVENT_START', 'LOAD_EVENT_SUCCESS', 'LOAD_EVENT_FAIL'],
      route: '/midnights/' + id,
      shouldCallAPI: () => true //fuck idk what to do here; this.props.event
    });
  },
});

const MidnightViewWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidnightView);

export default withRouter(MidnightViewWithData);