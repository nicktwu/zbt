/**
 * Created by nwu on 10/4/17.
 */
import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove(evt) {
    this.props.remove(this.props.token, this.props.id);
    this.props.close(evt);
  }

  render () {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.close}>
        <DialogTitle>{"Permanently delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {this.props.name} permanently? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.remove} color="accent">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default RemoveDialog;