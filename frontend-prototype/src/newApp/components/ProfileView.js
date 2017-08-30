import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './ProfileView.css';

class ProfileView extends Component {
  render() {
      console.log(this.props.user)
    const { match } = this.props;
    const { name } = this.props.user;
    const { image = "http://lorempixel.com/250/250/" } = this.props.user;
    const { workWeekHours } = this.props.user || "35";
    const { midnightPoints } = this.props.user || "7";
    const { socialPoints } = this.props.user || "10";
    const events = this.props.events || [{
      eventName: "ZBTahiti Doors 10pm",
      points: 2,
      dueDate: Date(2016, 10, 8)
    }, {
      eventName: "ZBTahiti Coatcheck 11pm",
      points: 3,
      dueDate: Date(2016, 10, 8)
    }];
    var assignments = events.map(function(task, index) {
      <div className="eventEntry">
  	    <li key={index}>{task.eventName}</li>
  	    <ul>
  	      <li>{task.points} pts</li>
  	      <li>{task.dueDate.month} {task.dueDate.date}, {task.dueDate.year}</li>
  	    </ul>
      </div>
    });

    return (
      <div className="body">
        <div className="content">
          <div className="profile">
            <div className="main">
              <div className="basic">
                <span className="helper"></span>
                <img className="profilepic" src={ image } />
                <h3 className="name">{ name }</h3>
              </div>
              <div className="points">
                <p>Workweek Hours: { workWeekHours }/40</p>
                <progress max="40" value={ workWeekHours }></progress>
              </div>
              <div className="points">
                <p>Midnight Points: { midnightPoints }/15</p>
                <progress max="15" value={ midnightPoints }></progress>
              </div>
              <div className="points">
                <p>Social Points: { socialPoints }/13</p>
                <progress max="13" value={ socialPoints }></progress>
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
      </div>
    );
  }
}

const mapStateToProps = (state, {type}) => ({ ...state[type], user: state.user });
const mapDispatchToProps = (dispatch, {type}) => ({
});

const ProfileViewWithUserData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileView);

export default withRouter(ProfileViewWithUserData);
