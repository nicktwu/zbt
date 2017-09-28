/**
 * Created by nwu on 9/24/17.
 */
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.pad,
  },
  paper: {
    padding: theme.spacing.pad,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
  },
  footer: {
    marginTop: theme.spacing.pad,
  },
  subheader: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  hidden: {
    display: "none",
  }
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.setField = this.setField.bind(this);
    this.loginCert = this.loginCert.bind(this);
    this.loginForm = this.loginForm.bind(this);
  }

  setField(name) {
    return (evt) => {
      let newState = {};
      newState[name] = evt.target.value;
      this.setState(newState);
    }
  }

  loginCert(evt) {
    evt.preventDefault();
    this.props.loginWithCertificate();
  }

  loginForm(evt) {
    evt.preventDefault();
    console.log(this.state);
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={5}>
                    <div className="vertical-center">
                      <Typography type="title" className={classes.header}>
                        Login with Username and Password
                      </Typography>
                      <form className={classes.form} onSubmit={this.loginForm}>
                        <TextField fullWidth id="username" label="Username" margin="normal" value={this.state.username} onChange={this.setField("username")}/>
                        <TextField fullWidth id="password" label="Password" type="password" value={this.state.password} onChange={this.setField("password")} margin="normal"/>
                        <Button className={classes.hidden} type="submit">Submit</Button>
                      </form>
                      <div className={classes.footer}>
                        <Button raised color="primary" onClick={this.loginForm}>
                          Login
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <div className="vertical-center">
                      or
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <div className="vertical-center">
                      <Typography type="title" className={classes.header}>
                        Login with Certificate
                      </Typography>
                      <div className={classes.footer}>
                        <Button raised color="primary" onClick={this.loginCert}>
                          Login
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

let StyledLogin = withStyles(styles)(LoginPage);

export default StyledLogin;