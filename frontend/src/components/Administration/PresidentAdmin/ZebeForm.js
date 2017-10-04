/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import {create, edit} from '../../../redux/user/actions';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return ({
    token: state.session.token,
  })
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: create(dispatch),
    editUser: edit(dispatch)
  }
}

const style = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

const initialState = {
  name:"",
  kerberos: "",
  president: false,
  midnight_maker: false,
  house_chair: false,
  workweek_chair: false,
  dev: false,
  rush_chair: false,
  social_chair: false,
  tech_chair: false,
  risk_manager: false,
  current: true,
};

class ZebeForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialState ? props.initialState : initialState;
    this.submit = this.submit.bind(this);
    this.changeState = this.changeState.bind(this);
    this.checkBox = this.checkBox.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialState) {
      this.setState(nextProps.initialState);
    } else {
      this.setState(initialState);
    }
  }

  submit(evt) {
    // TODO: Some sort of form validation should happen here (ie, checking that kerberos is ok, etc)
    if (!this.props.initialState) {
      this.props.createUser(this.props.token, this.state);
    } else {
      this.props.editUser(this.props.token, this.state);
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

  checkBox(name) {
    return (evt, checked) => {
      this.setState({ [name]: checked });
    }
  }


  render() {
    return (
      <form>
        <Dialog open={this.props.open} onRequestClose={this.props.cancel}>
          <DialogTitle>{this.props.initialState ? "Edit Zebe Permissions": 'Add a new Zebe'}</DialogTitle>
          <DialogContent>
            <TextField className={this.props.classes.textField}
                       label="Full Name" value={this.state.name}
                       onChange={this.changeState("name")}/>
            <TextField className={this.props.classes.textField}
                       label="Kerberos/Username" value={this.state.kerberos}
                       onChange={this.changeState("kerberos")}/>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.president}
                      onChange={this.checkBox('president')}
                      value="president"
                    />
                  }
                  label="President/VP"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.midnight_maker}
                      onChange={this.checkBox('midnight_maker')}
                      value="midnight_maker"
                    />
                  }
                  label="Midnight Maker"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.house_chair}
                      onChange={this.checkBox('house_chair')}
                      value="house_chair"
                    />
                  }
                  label="House Chair"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.workweek_chair}
                      onChange={this.checkBox('workweek_chair')}
                      value="workweek_chair"
                    />
                  }
                  label="Workweek Chair"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.dev}
                      onChange={this.checkBox('dev')}
                      value="dev"
                    />
                  }
                  label="House Software Developer"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.rush_chair}
                      onChange={this.checkBox('rush_chair')}
                      value="rush_chair"
                    />
                  }
                  label="Rush Chair"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.social_chair}
                      onChange={this.checkBox('social_chair')}
                      value="social_chair"
                    />
                  }
                  label="Social Chair"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.tech_chair}
                      onChange={this.checkBox('tech_chair')}
                      value="tech_chair"
                    />
                  }
                  label="Tech Chair"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.risk_manager}
                      onChange={this.checkBox('risk_manager')}
                      value="risk_manager"
                    />
                  }
                  label="Risk Manager"
                />
              </FormGroup>
            </FormControl>
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
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ZebeForm))