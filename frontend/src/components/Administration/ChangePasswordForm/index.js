/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Divider, Typography, Snackbar} from 'material-ui';
import {Paper, Button, TextField, withStyles} from 'material-ui';
import {changePassword} from '../../../redux/user/actions';

function mapStateToProps(state) {
  return {
    token: state.session.token,
    message: state.user.message,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePassword: changePassword(dispatch),
  }
}

const style = theme => ({
  paper: {
    marginTop: theme.spacing.unit*3,
    padding: theme.spacing.unit*3,
    marginBottom: theme.spacing.unit*3,
  },
  title: {
    marginTop: theme.spacing.unit*2,
  },
  buttonContainer : {
    marginTop: theme.spacing.unit*3,
    textAlign: "center",
  }
});


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirm_password: "",
    };
    this.setField = this.setField.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  setField(field) {
    return (evt) => {
      this.setState({[field]: evt.target.value})
    }
  }

  changePassword(evt) {
    evt.preventDefault();
    this.props.changePassword(this.props.token, this.state.password, this.state.confirm_password);
    this.setState({password:"",confirm_password:""});
  }

  render() {
    if (this.props.user && !this.props.user.password) {
      return (
        <Paper className={this.props.classes.paper}>
          <Typography type="headline" gutterBottom>Change Password</Typography>
          <Divider/>
          <div className={this.props.classes.buttonContainer}>
            Passwords have not been enabled for you. If you would like this feature, talk to the Tech Chair.
          </div>
        </Paper>
      )
    }
    return (
      <Paper className={this.props.classes.paper}>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                  open={!!this.props.message}
                  message={this.props.message}/>
        <Typography type="headline" gutterBottom>Change Password</Typography>
        <Divider/>
        <TextField fullWidth id="password" label="New Password" type="password" value={this.state.password} onChange={this.setField("password")} margin="normal"/>
        <TextField fullWidth id="confirm_password" label="Confirm Password" type="password" value={this.state.confirm_password} onChange={this.setField("confirm_password")} margin="normal"/>
        <div className={this.props.classes.buttonContainer}>
          <Button raised onClick={this.changePassword}>Change Password</Button>
        </div>
      </Paper>
    )
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));

export {Connected as ChangePassword}