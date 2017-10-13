/**
 * Created by nwu on 10/12/17.
 */
import React, {Component} from 'react';
import {Button, Grid, TextField, withStyles, FormControlLabel} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {connect} from 'react-redux';
import {getSemesters, createSemester, setCurrent} from '../../../redux/semester/actions';

function mapDispatchToProps(dispatch) {
  return {
    getSemesters: getSemesters(dispatch),
    createSemester: createSemester(dispatch),
    setCurrent: setCurrent(dispatch),
  }
}

function mapStateToProps(state) {
  return ({
    token: state.session.token,
    semesters: state.semester.all,
  })
}

const style = theme => ({
  centerButton: {
    textAlign: "center",
  }
});


class SemesterDialog extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeCurrent = this.changeCurrent.bind(this);
    this.add = this.add.bind(this);
    this.state = {
      name: "",
      startDate: (new Date()).toISOString().substring(0, 10),
      endDate: (new Date()).toISOString().substring(0, 10),
      current: false,
      selected: "",
    }
  }

  add() {
    this.props.createSemester(this.props.token, this.state);
    this.setState({
      name: "",
      startDate: (new Date()).toISOString().substring(0, 10),
      endDate: (new Date()).toISOString().substring(0, 10),
      current: false,
    })
  }

  save(evt) {
    this.props.setCurrent(this.props.token, this.state.selected);
    this.setState({
      name: "",
      startDate: (new Date()).toISOString().substring(0, 10),
      endDate: (new Date()).toISOString().substring(0, 10),
      current: false,
      selected: "",
    });
    this.props.close(evt);
  }

  componentWillMount() {
    if (this.props.getSemesters && this.props.token) {
      this.props.getSemesters(this.props.token);
    }
  }

  componentWillReceiveProps(props) {
    if (props.initial) {
      this.setState({selected:props.initial})
    }
  }

  changeState(field) {
    return (evt) => {
      let newState = {};
      newState[field] = evt.target.value;
      this.setState(newState);
    }
  }

  changeCurrent(event, value) {
    this.setState({selected: value})
  }

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.close}>
        <DialogTitle>{"Change Semester"}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <TextField margin="normal"
                             label="Name" value={this.state.name}
                             onChange={this.changeState("name")}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField type="date" fullWidth
                             label="Start Date" placeholder="" value={this.state.startDate} margin="normal"
                             onChange={this.changeState("startDate")}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField type="date" fullWidth placeholder=""
                             label="End Date" value={this.state.endDate} margin="normal"
                             onChange={this.changeState("endDate")}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={this.props.classes.centerButton}>
              <Button onClick={this.add} raised>Add This Semester</Button>
            </Grid>
            <Grid item xs={12} className={this.props.classes.centerButton}>
              { this.props.semesters && this.props.semesters.length ?
              <RadioGroup aria-label="Current Semester" name="Semester" value={this.state.selected}
                          onChange={this.changeCurrent}>
                { this.props.semesters.map((sem, idx) => {
                  return <FormControlLabel key={idx} value={sem._id} control={<Radio/>} label={sem.name} />
                })}
              </RadioGroup> : "There are no current semesters" }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.save} color="accent">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(SemesterDialog));