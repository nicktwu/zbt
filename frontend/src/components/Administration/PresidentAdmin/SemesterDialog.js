/**
 * Created by nwu on 10/12/17.
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
import {getSemesters} from '../../../redux/semester/actions';

function mapDispatchToProps(dispatch) {
  return {
    getSemesters: getSemesters(dispatch),
  }
}

function mapStateToProps(state) {
  return ({
    token: state.session.token,
    semesters: state.semester.all,
  })
}

class SemesterDialog extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(evt) {
    this.props.resetPassword(this.props.token, this.props.kerberos);
    this.props.close(evt);
  }

  componentWillMount() {
    if (this.props.getSemesters) {
      this.props.getSemesters();
    }
  }

  render () {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.close}>
        <DialogTitle>{"Change Semester"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset {this.props.kerberos}'s password to "brotherhood"? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.save} color="accent">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SemesterDialog);