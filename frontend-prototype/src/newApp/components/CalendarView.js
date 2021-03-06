import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import './CalendarView.css';

class CalendarView extends Component {
  componentDidMount() {
    this.props.fetchCurrentWeek();
    this.props.fetchTrades();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.props.fetchCurrentWeek();
      this.props.fetchTrades();
    }
  }

  render() {
    const { events, trades, user, type } = this.props;

    if (type === 'profile') {
      return null;
    }

    return (
      <div className="CalendarView">
        {[...Array(7).keys()].map(day => {
          const dayEvents = (events || [])
                .filter(event => event.date.getDay() === day)
                .map(event => ({
                  ...event,
                  properties: {
                    available: !event.zebe || trades.findIndex(trade => trade.midnight_id === event._id && !trade.completed) !== -1,
                    important: event.zebe === user.kerberos,
                  },
                }));

          dayEvents.sort(eventCompare);

          const today = new Date();
          const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + day);

          return (
            <div key={day} className="CalendarView-day">
              <div className="CalendarView-date">{d.toLocaleString('en-us', {weekday: 'short'})} {d.getMonth()}/{d.getDate()}</div>
              <div className="CalendarView-events">
              {dayEvents.map(
                (event, i) =>
                  <div key={i} className={classnames('CalendarView-event', event.properties)} onClick={() => this.props.history.push({pathname: `/midnights/${event._id}`, event: event})}>
                      <div className="CalendarView-event-name">{event.task}</div>
                      <div className="CalendarView-event-details">
                        <div className="CalendarView-event-assignee">{event.zebe || 'none'}</div>
                        <div className="CalendarView-event-points">{event.potential} pts</div>
                      </div>
                  </div>)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

// order events:
// important first, then anything available, then the rest
const eventCompare = (a, b) => {
  if (a.properties.important && !b.properties.important) {
    return -1;
  }

  if (!a.properties.important && b.properties.important) {
    return 1;
  }

  if (a.properties.available && !b.properties.available) {
    return -1;
  }

  if (!a.properties.available && b.properties.available) {
    return 1;
  }

  return a.task.localeCompare(b.task);
};

const mapStateToProps = (state, {type}) => ({ ...state[type], user: state.user });
const mapDispatchToProps = (dispatch, {type}) => ({
  fetchCurrentWeek() {
    dispatch({
      types: ['LOAD_WEEKLIST_START', 'LOAD_WEEKLIST_SUCCESS', 'LOAD_WEEKLIST_FAIL'],
      route: `/${type}/weeklist`
    });
  },
  fetchTrades() {
    dispatch({
      types: ['LOAD_TRADES_START', 'LOAD_TRADES_SUCCESS', 'LOAD_TRADES_FAIL'],
      route: '/trades/midnight'
    });
  },
});

const CalendarViewWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarView);

export default withRouter(CalendarViewWithData);
