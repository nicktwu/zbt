import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MidnightTradingPanel from './MidnightTradingPanel';

import './MidnightView.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class MidnightView extends Component {
  componentDidMount() {
    this.props.fetchEvent();
  }

  render() {
    const { event, user, type } = this.props.location;
    console.log(this.props);

    return (
      <div className="MidnightView">
        <div className="MidnightInfoPanel">
          <div className="MidnightInfoPanel-title">
            {event.task} - {days[event.date.getDay()]} {event.date.getMonth()}/{event.date.getDate()}
          </div>
          <div className="MidnightInfoPanel-important">
            Assignee: {event.zebe}
          </div>
          <div className="MidnightInfoPanel-important">
            Points: {event.potential} Reviewed: {event.reviewed ? <font color='00FF00'>True</font> : <font color='FF0000'>False</font>}
          </div>
          <div className="MidnightInfoPanel-description">
            this midnight involves doing this work, that work, and that work
          </div>
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
      shouldCallAPI: (state) => !state.event
    });
  },
});

const MidnightViewWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidnightView);

export default withRouter(MidnightViewWithData);