/**
 * Created by nwu on 9/26/17.
 */
import React, {Component} from 'react';
import {Grid, Typography, Paper, withStyles} from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';

const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
    marginBottom: theme.spacing.unit*3
  }
});

class Loader extends Component {

  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }

  componentWillReceiveProps(nextProps) {
    nextProps.promise.then(()=>{this.setState({loaded:true})});
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return (
        <Paper className={this.props.classes.paper}>
          <Grid container align="center" direction="column" justify="center">
            <Typography gutterBottom type="button">Loading...</Typography>
            <CircularProgress size={80}/>
          </Grid>
        </Paper>
      )
    }
  }
}

const StyledLoader = withStyles(style)(Loader);

export {StyledLoader as Loader};