/**
 * Created by nwu on 10/4/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWeekList} from '../../redux/midnight/actions';
import {Paper, Divider, Grid, Typography, withStyles} from 'material-ui';

const daysOfTheWeek=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function mapStateToProps(state) {
  return {
    token: state.session.token,
    user: state.user.user,
    midnightList: state.midnight.midnights,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMidnights: getWeekList(dispatch)
  }
}

const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
    marginBottom: theme.spacing.unit*3,
  },
  calendar: {
    marginTop: theme.spacing.unit*3,
  }
});


class Midnights extends Component {

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getMidnights) {
      props.getMidnights(props.token)
    }
  }

  render() {
    if (this.props.user) {
      return (
        <div>
        <Paper className={this.props.classes.paper} elevation={4}>
          <Typography type="headline" gutterBottom>Midnights</Typography>
          <Divider/>
          <Grid container spacing={8} className={this.props.classes.calendar} justify="center" align="stretch">
            { daysOfTheWeek.map((day, index) => {
              return (
                <Grid sm={12} md={true} item key={index}>
                  <Typography type="subheading">{day}</Typography>
                  <Grid container direction="column">
                    { this.props.midnightList[index].length ? this.props.midnightList[index].map((midnight, idx) => {
                      return (
                        <Grid item key={idx}>
                          {midnight.task}
                        </Grid>
                      )
                    }) :
                      <Grid item>
                        <Typography type="caption"> No midnights have been assigned for this day. </Typography>
                      </Grid>
                    }
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Paper>
          <Paper className={this.props.classes.paper} elevation={4}>
            <Typography type="headline" gutterBottom>Points</Typography>
            <Divider/>
          </Paper>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Midnights));

export default Connected