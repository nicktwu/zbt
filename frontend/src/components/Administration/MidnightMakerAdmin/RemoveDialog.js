/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {connect} from 'react-redux';
import {remove} from '../../../redux/user/actions';

function mapDispatchToProps(dispatch) {
  return {
    removeUser: remove(dispatch),
  }
}

function mapStateToProps(state) {
  return ({
    token: state.session.token,
  })
}

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove(evt) {
    this.props.removeUser(this.props.token, this.props.kerberos);
    this.props.close(evt);
  }

  render () {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.close}>
        <DialogTitle>{"Permanently delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {this.props.kerberos} permanently? This action is irreversible.
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

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDialog);