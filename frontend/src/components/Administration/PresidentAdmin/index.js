/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../../redux/user/actions';
import {Divider, Typography} from 'material-ui';
import {Paper, withStyles} from 'material-ui';
import ZebeForm from './ZebeForm';
import ZebeEntry from './ZebeEntry';
import AdminTable from '../AdminTable';

function mapStateToProps(state) {
  return {
    all: state.user.allUsers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: getAll(dispatch)
  }
}

const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
  },
});


class Admin extends Component {

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getAllUsers) {
      props.getAllUsers(props.token);
    }
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography type="headline" gutterBottom>President/VP Admin Panel</Typography>
        <Divider/>
        <AdminTable form={ZebeForm} contents={this.props.all} createMessage="Add a new zebe"
                    componentForEntry={ZebeEntry}
                    headings={["Full Name","Kerberos/Username","Edit","Reset Password","Remove"]}/>
      </Paper>
    )
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));

export {Connected as PresidentAdmin}