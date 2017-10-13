/**
 * Created by nwu on 10/12/17.
 */
import React, {Component} from 'react';
import {Button, withStyles} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

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
    this.save = this.save.bind(this);
    this.close = this.close.bind(this);
  }

  close(evt) {
    this.setState({open: false})
  }

  save(evt) {
    this.close(evt);
  }

  render () {
    return (
      <div>
        <div className={this.props.classes.buttonContainer}>
          <Button raised color="primary" onClick={()=>{this.setState({open:true})}}>Review past midnights</Button>
        </div>
        <Dialog open={this.state.open} onRequestClose={this.close}>
          <DialogTitle>{"Review Midnights"}</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.save} color="accent">
              Save All
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(style)(RemoveDialog);