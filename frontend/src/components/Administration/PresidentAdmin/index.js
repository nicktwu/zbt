/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../../redux/user/actions';
import {getCurrent} from '../../../redux/semester/actions';
import {Divider, Typography, Button, Grid} from 'material-ui';
import {Paper, withStyles} from 'material-ui';
import ZebeForm from './ZebeForm';
import ZebeEntry from './ZebeEntry';
import AdminTable from '../AdminTable';
import SemesterDialog from './SemesterDialog';
import {Loader} from "../../Loader/index";


const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
  },
  semesterPaper: {
    marginTop: theme.spacing.unit*3,
    padding: theme.spacing.unit*3,
  }
});


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.closeSemester = this.closeSemester.bind(this);
    this.openSemesters = this.openSemesters.bind(this);
  }

  openSemesters() {
    this.setState({open: true});
  }

  closeSemester() {
    this.setState({open: false});
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography type="headline" gutterBottom>President/VP Admin Panel</Typography>
        <Divider/>
        <Paper className={this.props.classes.semesterPaper}>
          <Grid container justify="space-between" align="center">
            <Grid item>
              <Typography type="subheading">
                Semester: {this.props.semester && this.props.semester.name ? this.props.semester.name : "None"}
              </Typography>
            </Grid>
            <Grid item>
              <Button color="accent" onClick={this.openSemesters} className={this.props.classes.button} dense raised>Change</Button>
            </Grid>
          </Grid>
        </Paper>
        <SemesterDialog open={this.state.open} close={this.closeSemester} initial={this.props.semester._id}/>
        <AdminTable form={ZebeForm} contents={this.props.all} createMessage="Add a new zebe"
                    componentForEntry={ZebeEntry}
                    headings={["Full Name", "Kerberos/Username", "Edit", "Reset Password", "Remove"]}/>
      </Paper>
    )
  }
}

const StyledAdmin = withStyles(style)(Admin);


function mapStateToProps(state) {
  return {
    token: state.session.token,
    all: state.user.allUsers,
    semester: state.semester.semester
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: getAll(dispatch),
    getSemester: getCurrent(dispatch)
  }
}


class PresidentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
    }
  }

  componentWillMount() {
    let props = this.props;
    this.setState({
      requests: Promise.all([
        props.getAllUsers(props.token),
        props.getSemester(props.token)
      ])
    })
  }

  render() {
    return (
      <Loader promise={this.state.requests}>
        <StyledAdmin all={this.props.all}
                     semester={this.props.semester}
        />
      </Loader>
    )
  }
}


let Connected = connect(mapStateToProps, mapDispatchToProps)(PresidentWrapper);

export {Connected as PresidentAdmin}