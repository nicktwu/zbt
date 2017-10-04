/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../../redux/user/actions';
import {Divider, Typography} from 'material-ui';
import {Paper, Button, withStyles} from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import ZebeForm from './ZebeForm';
import ZebeEntry from './ZebeEntry';

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
  table: {
    marginTop: theme.spacing.unit*3,
  },
  tableRow: {
  },
  tableCell: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    verticalAlign: "middle",
  },
  addIcon: {
    height: theme.spacing.unit*2,
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
      open: false,
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getAllUsers) {
      props.getAllUsers(props.token);
    }
  }

  openForm(event) {
    event.preventDefault();
    this.setState({open: true});
  }

  closeForm(event) {
    event.preventDefault();
    this.setState({open:false});
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography type="headline" gutterBottom>President/VP Admin Panel</Typography>
        <Divider/>
        <div className={this.props.classes.buttonContainer}>
          <Button raised onClick={this.openForm}><AddIcon className={this.props.classes.addIcon}/> Add a new zebe</Button>
        </div>
        <ZebeForm open={this.state.open} cancel={this.closeForm}/>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow className={this.props.classes.tableRow}>
              <TableCell className={this.props.classes.tableCell}><Typography type="subheading">Full name</Typography></TableCell>
              <TableCell className={this.props.classes.tableCell}><Typography type="subheading">Kerberos/Username</Typography></TableCell>
              <TableCell className={this.props.classes.tableCell}><Typography type="subheading">Edit</Typography></TableCell>
              <TableCell className={this.props.classes.tableCell}><Typography type="subheading">Reset Password</Typography></TableCell>
              <TableCell className={this.props.classes.tableCell}><Typography type="subheading">Remove</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.all ? this.props.all.map((entry, index) => {
              return (
                <ZebeEntry tableCell={this.props.classes.tableCell}
                           tableRow={this.props.classes.tableRow}
                           entry={entry} index={index} key={index} />
              )
            }) : null }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));

export {Connected as PresidentAdmin}