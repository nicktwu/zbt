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
    const { event, user, type } = this.props;

    if (!event) {
      return (
        <div>Loading...</div>
        );
    }

    return (
      <div className="MidnightView">
        <div className="MidnightInfoPanel">
          <div className="MidnightView-title">
            {event.task} - {event.date.toLocaleString('en-us', {weekday: 'short'})} {event.date.getMonth()}/{event.date.getDate()}
          </div>
          <div className="MidnightInfoPanel-important">
            Assignee: {event.zebe || "none"}
          </div>
          <div className="MidnightInfoPanel-important">
            Points: {event.potential} Reviewed: {event.reviewed ? <font color='00FF00'>True</font> : <font color='FF0000'>False</font>}
          </div>
          <div className="MidnightInfoPanel-description">
            this midnight involves doing: 
            <ul>
              <li>this work, </li>
              <li>that work, </li>
              <li>and that work </li>
            </ul>
          </div>
        </div>

        <MidnightTradingPanel />
      </div>
    );
  }
}


const mapStateToProps = (state, {id, type}) =>
   ({ event: state[type].events.find(event => event._id === id), user: state.user });
const mapDispatchToProps = (dispatch, {id, type}) => ({
  fetchEvent() {
    dispatch({
      types: ['LOAD_EVENT_START', 'LOAD_EVENT_SUCCESS', 'LOAD_EVENT_FAIL'],
      route: '/midnights/' + id,
      shouldCallAPI: (state) => !state[type].events.includes(event => event._id === id),
    });
  },
});

const MidnightViewWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidnightView);

export default MidnightViewWithData;