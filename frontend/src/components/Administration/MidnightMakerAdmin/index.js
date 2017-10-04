/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWeekList, getTypeList} from '../../../redux/midnight/actions';
import {Divider, Typography, Paper, withStyles, Button} from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import MidnightTypeForm from './MidnightTypeForm';
import MidnightType from './MidnightType';

function mapStateToProps(state) {
  return {
    token: state.session.token,
    midnights: state.midnight.midnights,
    types: state.midnight.types
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMidnights: getWeekList(dispatch),
    getTypes: getTypeList(dispatch)
  }
}

const style = theme => ({
  paper: {
    marginTop: theme.spacing.unit*3,
    padding: theme.spacing.unit*3,
  },
  title: {
    marginTop: theme.spacing.unit*2,
  },
  buttonContainer : {
    marginTop: theme.spacing.unit*3,
    textAlign: "center",
  },
  tableContainer: {
    overflowX: "scroll",
  },
  table: {
    marginTop: theme.spacing.unit*3,
  },
  tableCell: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    verticalAlign: "middle",
  },
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
    if (props.token && props.getTypes) {
      props.getTypes(props.token);
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
        <Typography type="headline" gutterBottom>Midnight Maker Admin Panel</Typography>
        <Divider/>
        <div className={this.props.classes.buttonContainer}>
          <Button raised onClick={this.openForm}><AddIcon className={this.props.classes.addIcon}/>Create a new type of midnight</Button>
        </div>
        <MidnightTypeForm open={this.state.open} cancel={this.closeForm}/>
        <div className={this.props.classes.tableContainer}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={this.props.classes.tableCell}>
                  <Typography type="subheading">Midnight Task</Typography>
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  <Typography type="subheading">Default Value</Typography>
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  <Typography type="subheading">Description</Typography>
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  <Typography type="subheading">Edit</Typography>
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  <Typography type="subheading">Remove</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.props.types && this.props.types.length ?
                this.props.types.map((type, index) => {
                  return (
                    <MidnightType key={index} tableCell={this.props.classes.tableCell}
                                  tableRow={this.props.classes.tableRow} entry={type}/>
                  )
                }) : <TableRow><TableCell className={this.props.classes.tableCell}>
                  <Typography type="caption">No midnight types exist</Typography>
                </TableCell></TableRow>
              }
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));

export {Connected as MidnightMaker}