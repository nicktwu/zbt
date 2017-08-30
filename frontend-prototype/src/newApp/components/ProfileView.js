import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileView.css';

export default class ProfileView extends Component {
  render() {
    const { match } = this.props;
    const { name } = match.name;
    const { image } = match.image;
    const { workWeekHours } = match.workWeekHours;
    const { midnightPoints } = match.midnightPoints;
    const { socialPoints } = match.socialPoints;
    const { events } = match.events;
    var assignments = this.props.Assignments.map(function(task, index) {
      <div className="eventEntry">
  	    <li key={index}>{task.eventName}</li>
  	    <ul>
  	      <li>{task.points} pts</li>
  	      <li>{task.dueDate.month} {task.dueDate.date}, {task.dueDate.year}</li>
  	    </ul>
      </div>
    });

    return (
      <head>
      	<title>{name}</title>
      </head>
      <body>
        <div className="content"}>
          <div className="profile">
            <div class="main">
              <div class="basic">
                <span class="helper"></span>
                <img className="profilepic" src='http://lorempixel.com/250/250/' />
                <h3 className="name">{ name }</h3>
              </div>
              <div className="points">
                <p>Workweek Hours: { workWeekHours }/40</p>
                <progress max="40" value={ workWeekHours }></progress>
              </div>
              <div className="points">
                <p>Midnight Points: 4/15</p>
                <progress max="15" value=4></progress>
              </div>
              <div className="points">
                <p>Social Points: 7/13</p>
                <progress max="13" value=7></progress>
              </div>
            </div>
            <div className="assignmentsList">
              <h5 className="assignHeading">My assignments: </h5>
              <div className="assingments">
                { assignments }
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
