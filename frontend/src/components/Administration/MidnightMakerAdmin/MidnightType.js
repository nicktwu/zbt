/**
 * Created by nwu on 10/4/17.
 */
import React, {Component} from 'react';
import {IconButton} from 'material-ui';
import { TableCell, TableRow } from 'material-ui/Table';
import RemoveIcon from 'material-ui-icons/RemoveCircle';
import EditIcon from 'material-ui-icons/Edit';
import MidnightTypeForm from './MidnightTypeForm';
import RemoveDialog from './RemoveTypeDialog';

export default class ZebeEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRemove: false,
      openEdit: false,
    };
    this.openDialog = this.openDialog.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  openDialog(evt) {
    evt.preventDefault();
    this.setState({openRemove:true})
  }

  openEdit(evt) {
    evt.preventDefault();
    this.setState({openEdit:true})
  }

  closeDialog(evt) {
    evt.preventDefault();
    this.setState({openRemove:false});
  }

  closeEdit(evt) {
    evt.preventDefault();
    this.setState({openEdit:false});
  }

  render() {
    return (
      <TableRow key={this.props.index} className={this.props.tableRow}>
        <TableCell className={this.props.tableCell}>{this.props.entry.name}</TableCell>
        <TableCell className={this.props.tableCell}>{this.props.entry.value}</TableCell>
        <TableCell className={this.props.tableCell}>{this.props.entry.description}</TableCell>
        <TableCell>
          <IconButton color="primary" onClick={this.openEdit}>
            <EditIcon/>
          </IconButton>
          <MidnightTypeForm open={this.state.openEdit} cancel={this.closeEdit} initialState={this.props.entry} />
        </TableCell>
        <TableCell>
          <IconButton color="accent" onClick={this.openDialog}>
            <RemoveIcon/>
          </IconButton>
          <RemoveDialog open={this.state.openRemove} name={this.props.entry.name}
                        id={this.props.entry._id} close={this.closeDialog}/>
        </TableCell>
      </TableRow>
    )
  }
}