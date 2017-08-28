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
        assingmentsString += '<div>'
        assingmentsString += '<li key={index}>{tasks.eventName}</li>'
        assingmentsString += '<ul>'
        assingmentsString += '<li>{tasks.points} pts</li>'
        assingmentsString += '<li>{tasks.month} {tasks.date}, {tasks.year}</li>'
        assingmentsString += '</ul>'
        assingmentsString += '</div>' + '\n'
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
            <div>{assingmentsString}</div>
		</div>
	);
  }
}
