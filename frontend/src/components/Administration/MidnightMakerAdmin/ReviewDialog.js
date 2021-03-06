/**
 * Created by nwu on 10/12/17.
 */
import React, {Component} from 'react';
import {Button, Grid, TextField, withStyles} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class MidnightReviewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.save = this.save.bind(this);
  }

  save() {
    let data = {
      _id: this.props.midnight._id,
      awarded: this.state.value
    };
    this.props.awardOne(data);
  }

  componentWillMount() {
    if (this.props.midnight) {
      if (this.props.midnight.potential) {
        this.setState({ value: this.props.midnight.potential })
      } else {
        this.setState({value: this.props.possible })
      }
    }
  }

  render() {
    return (
      <Grid container  align="center">
        <Grid item xs={12} md={6}>
          {this.props.midnight.date.substring(0,10)}: {this.props.midnight.task} ({this.props.midnight.zebe})
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField type="number" label="Award" value={this.state.value} onChange={(evt)=>{this.setState({value: evt.target.value})}}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button raised onClick={this.save}>Save</Button>
        </Grid>
      </Grid>
    )
  }
}


const style = theme => ({
  buttonContainer : {
    marginTop: theme.spacing.unit*3,
    textAlign: "center",
  },
});

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    this.props.refresh();
    this.setState({open: true});
  }

  close(evt) {
    this.setState({open: false})
  }

  render () {
    return (
      <div>
        <div className={this.props.classes.buttonContainer}>
          <Button raised color="primary" onClick={this.open}>Review past midnights</Button>
        </div>
        <Dialog open={this.state.open} onRequestClose={this.close}>
          <DialogTitle>{"Review Midnights"}</DialogTitle>
          <DialogContent>
            {this.props.unreviewed.map((m,idx) => {
              let possible = this.props.types.filter((t) => (t.name === m.task)).reduce((s,v) => v.value, 0);
              return (
                <MidnightReviewEntry key={idx} midnight={m} possible={possible} awardOne={this.props.awardOne}/>
              )
            })}
            { this.props.unreviewed.length ? null : "No unreviewed midnights!"}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(style)(RemoveDialog);