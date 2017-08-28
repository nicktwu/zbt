import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export default class CalendarView extends Component {
  render() {
    const { match } = this.props;
    const { reqType } = match.params;
    const events = [{
      title: 'Waitings',
      start: new Date(2017, 7, 27, 14, 15, 0),
      end: new Date(2017, 7, 27, 22, 15, 0),
    }];

    return (
      <div>
        <BigCalendar
          events={events}
          views={['week', 'month']}
          defaultView="week"
          min={new Date(0, 0, 0, 10, 0, 0)}
          max={new Date(0, 0, 0, 23, 59, 59)}
          />
      </div>
    );
  }
}
