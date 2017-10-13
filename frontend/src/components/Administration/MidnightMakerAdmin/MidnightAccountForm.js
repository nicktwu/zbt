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
import {createAccount, editAccount} from '../../../redux/midnight/actions';
import {getAll} from '../../../redux/user/actions'
import {getCurrent} from '../../../redux/semester/actions'
import {connect} from 'react-redux';
import TypeSelect from './TypeSelect'

function mapStateToProps(state) {
  return ({
    token: state.session.token,
    zebes: state.user.allUsers,
    semester: state.semester.semester,
  })
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentSemester: getCurrent(dispatch),
    getAllUsers: getAll(dispatch),
    create: createAccount(dispatch),
    edit: editAccount(dispatch),
  }
}

const style = theme => ({
  dialogContent: {
    boxSizing: "border-box",
  }
});

const initialState = {
  zebe: "",
  balance: 0,
  requirement: 0,
};

class MidnightAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialState ? {
      _id: props.initialState._id,
      zebe: props.initialState.zebe,
      balance: props.initialState.balance,
      requirement: props.initialState.requirement,
    }: initialState;

    this.submit = this.submit.bind(this);
    this.changeState = this.changeState.bind(this);
    this.setZebe = this.setZebe.bind(this);
  }

  componentWillMount() {
    if (this.props.getAllUsers && this.props.token && this.props.getCurrentSemester) {
      this.props.getAllUsers(this.props.token);
      this.props.getCurrentSemester(this.props.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialState) {
      this.setState({
        _id: nextProps.initialState._id,
        zebe: nextProps.initialState.zebe,
        balance: nextProps.initialState.balance,
        requirement: nextProps.initialState.requirement,
      });
    } else {
      this.setState(initialState);
    }
  }

  submit(evt) {
    // TODO: Some sort of form validation should happen here
    let body = this.state;
    if (this.props.semester && this.props.semester.name) {
      body["semester"] = this.props.semester.name
    }
    if (!this.props.initialState) {
      this.props.create(this.props.token, body);
    } else {
      this.props.edit(this.props.token, body);
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

  setZebe(newValue) {
    this.setState({zebe: newValue});
  }


  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.cancel}>
        <DialogTitle>{this.props.initialState ? "Edit Midnight Account" : 'Create Midnight Account'}</DialogTitle>
        <DialogContent className={this.props.classes.dialogContent}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              {this.props.zebes ? <TypeSelect handleSuggestionSelect={(suggestion)=>{return suggestion.kerberos}}
                                              initialValue={this.props.initialState ? this.props.initialState.zebe : null}
                                              handleChange={this.setZebe} label="Zebe" valueForSuggestion={s=>s.kerberos}
                                              suggestions={this.props.zebes}/> : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField className={this.props.classes.textField} type="number" fullWidth
                         label="Current Points" value={this.state.balance} margin="normal"
                         onChange={this.changeState("balance")}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField className={this.props.classes.textField} type="number" fullWidth
                         label="Requirement" value={this.state.requirement} margin="normal"
                         onChange={this.changeState("requirement")} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MidnightAccountForm))