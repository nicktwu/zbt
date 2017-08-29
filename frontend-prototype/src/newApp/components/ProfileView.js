import React, { Component } from 'react';

export default class ProfileView extends Component {
  render() {
    const { match } = this.props;
    const { name } = match.name;
    const { image } = match.image;
    const { workWeekHours } = match.workWeekHours;
    const { midnightPoints } = match.midnightPoints;
    const { socialPoints } = match.socialPoints;
    const { events } = match.events;
    var assignments = this.props.Assignments.map(function(tasks, index) {
      <div>
	    <li key={index}>{tasks.eventName}</li>
	    <ul>
	      <li>{tasks.points} pts</li>
	      <li>{tasks.month} {tasks.date}, {tasks.year}</li>
	    </ul>
      </div>
    });

    return (
      <title>{name}</title>
      <div>
        <h3>{name}</h3>
        <img src={image} />
        <div>
          <p>Workweek Hours: {workWeekHours}</p>
          <p>Midnight Points: {midnightPoints}</p>
          <p>Social Points: {socialPoints}</p>
        </div>
        <div>
          {assignments}
        </div>
      </div>
    );
  }
}
