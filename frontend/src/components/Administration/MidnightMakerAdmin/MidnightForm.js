/**
 * Created by nwu on 10/4/17.
 */
import React, {Component} from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import {withStyles, Grid, Button, TextField} from 'material-ui';
import {createMidnight, editMidnight} from '../../../redux/midnight/actions';
import {connect} from 'react-redux';
import TypeSelect from './TypeSelect'

function mapStateToProps(state) {
  return ({
    token: state.session.token,
    types: state.midnight.types,
    accounts: state.midnight.accounts,
  })
}

function mapDispatchToProps(dispatch) {
  return {
    create: createMidnight(dispatch),
    edit: editMidnight(dispatch),
  }
}

const style = theme => ({
  dialogContent: {
    boxSizing: "border-box",
  }
});

const initialState = {
  date: (new Date()).toISOString().substring(0, 10),
  zebe: "",
  task: "",
  note: "",
  potential: 0,
};

class MidnightTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialState ? {
      _id: props.initialState._id,
      date: (new Date(props.initialState.date)).toISOString().substring(0, 10),
      zebe: props.initialState.zebe,
      task: props.initialState.task,
      note: props.initialState.note,
      potential: props.initialState.potential
    }: initialState;

    this.submit = this.submit.bind(this);
    this.changeState = this.changeState.bind(this);
    this.setTask = this.setTask.bind(this);
    this.setZebe = this.setZebe.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialState) {
      this.setState({
        _id: nextProps.initialState._id,
        date: (new Date(nextProps.initialState.date)).toISOString().substring(0, 10),
        zebe: nextProps.initialState.zebe,
        task: nextProps.initialState.task,
        note: nextProps.initialState.note,
        potential: nextProps.initialState.potential
      });
    } else {
      this.setState(initialState);
    }
  }

  submit(evt) {
    // TODO: Some sort of form validation should happen here
    if (!this.props.initialState) {
      this.props.create(this.props.token, this.state);
    } else {
      this.props.edit(this.props.token, this.state);
    }
    this.props.cancel(evt);
  }

  changeState(field) {
    return (evt) => {
      let newState = {};
      newState[field] = evt.target.value;
      this.setState(newState);
    }
  }

  setTask(newValue) {
    this.setState({task: newValue});
  }

  setZebe(newValue) {
    this.setState({zebe: newValue});
  }


  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.cancel}>
        <DialogTitle>{this.props.initialState ? "Edit Midnight Assignment" : 'Assign New Midnight'}</DialogTitle>
        <DialogContent className={this.props.classes.dialogContent}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              {this.props.types ? <TypeSelect handleSuggestionSelect={(suggestion)=>{this.setState({potential:suggestion.value}); return suggestion.name}}
                                              initialValue={this.props.initialState ? this.props.initialState.task : null}
                                              handleChange={this.setTask} label="Task" valueForSuggestion={s => s.name}
                                              suggestions={this.props.types}/> : null}
            </Grid>
            <Grid item xs={12} sm={3}>
              { this.props.accounts ? <TypeSelect handleSuggestionSelect={(sug)=>{return sug.zebe}}
                                                  initialValue={this.props.initialState ? this.props.initialState.zebe : null}
                                                  handleChange={this.setZebe} label="Zebe" valueForSuggestion={s => s.zebe}
                                                  suggestions={this.props.accounts}/> : null}
            </Grid>
            <Grid item xs={12} sm={1}>
              <TextField className={this.props.classes.textField} type="number" fullWidth
                         label="Points" value={this.state.potential} margin="normal"
                         onChange={this.changeState("potential")}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField className={this.props.classes.textField} type="date" fullWidth
                         label="Date" value={this.state.date} margin="normal"
                         onChange={this.changeState("date")} />
            </Grid>
            <Grid item xs={12}>
              <TextField className={this.props.classes.textField} multiline margin="normal"
                         label="Note" value={this.state.note} fullWidth
                         onChange={this.changeState("note")}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary">
            { this.props.initialState ? "Save" : "Create" }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MidnightTypeForm))