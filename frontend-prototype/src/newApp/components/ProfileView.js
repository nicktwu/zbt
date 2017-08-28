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
	var assingmentsString = '';
	var assignments = this.props.Assignments.map(function(tasks, index){
        string += '<div>'
        string += '<li key={index}>{tasks.eventName}</li>'
        stirng += '<ul>'
        string += '<li>{tasks.points} pts</li>'
        string += '<li>{tasks.month} {tasks.date}, {tasks.year}</li>'
        string += '</ul>'
        stirng += '</div>' + '\n'
    });

	return (
		<div>
			<h3>{name}</h3>
			<img src={image} />
			<div>
                <p>Workweek Hours: {workweekHours}</p>
                <p>Midnight Points: {midnightPoints}</p>
                <p>Social Points: {socialPoints}</p>
            </div>
            <div>{assignments}</div>
		</div>
	);
  }
}
