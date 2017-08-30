import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CalendarView.css';

class CalendarView extends Component {
  componentDidMount() {
    this.props.fetchCurrentWeek();
  }

  render() {
    const { events } = this.props;

    return (
      <div className="CalendarView">
        {[...Array(7).keys()].map(day => {
          const dayEvents = (events || []).filter(event => event.date.getDay() === day);
          const today = new Date();
          const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + day);

          return (
            <div key={day} className="CalendarView-day">
              <div>{d.toLocaleString('en-us', {weekday: 'short'})} {d.getMonth()}/{d.getDate()}</div>
              <div className="CalendarView-events">
              {dayEvents.map(
                (event, i) =>
                  <div key={i} className="CalendarView-event">
                      <div>{event.task}</div>
                      <div>{event.zebe}</div>
                  </div>)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, {type}) => state[type];
const mapDispatchToProps = (dispatch, {type}) => ({
  fetchCurrentWeek() {
    dispatch({
      types: ['LOAD_WEEKLIST_START', 'LOAD_WEEKLIST_SUCCESS', 'LOAD_WEEKLIST_FAIL'],
      route: '/midnights/weeklist',
    });
  },
});

const CalendarViewWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarView);

export default CalendarViewWithData;
