/**
 * Created by nwu on 10/4/17.
 */
import React, {Component} from 'react';
import {Typography, withStyles, Button} from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';

const style = theme => ({
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
    maxWidth: "300px",
    textOverflow: "ellipsis",
    overflow: "hidden",

  },
});

class AdminTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }
  openForm() {
    this.setState({open:true})
  }

  closeForm() {
    this.setState({open:false});
  }

  render() {
    let Form = this.props.form;
    let Entry = this.props.componentForEntry;
    return (
      <div>
        <div className={this.props.classes.buttonContainer}>
          <Button raised onClick={this.openForm}><AddIcon className={this.props.classes.addIcon}/>{this.props.createMessage}</Button>
        </div>
        <Form open={this.state.open} cancel={this.closeForm}/>
        <div className={this.props.classes.tableContainer}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                { this.props.headings.map((heading, index) => {
                  return (
                    <TableCell key={index} className={this.props.classes.tableCell}>
                      <Typography type="subheading">{heading}</Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              { this.props.contents && this.props.contents.length ?
                this.props.contents.map((entry, index) => {
                  return (
                    <Entry key={index} tableCell={this.props.classes.tableCell}
                           tableRow={this.props.classes.tableRow} entry={entry} extra={this.props.extra}/>
                  )
                }) :
                <TableRow><TableCell className={this.props.classes.tableCell}>
                  <Typography type="caption">{this.props.missing}</Typography>
                </TableCell></TableRow>
              }
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

export default withStyles(style)(AdminTable);