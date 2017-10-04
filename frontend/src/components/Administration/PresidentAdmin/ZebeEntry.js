/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {IconButton} from 'material-ui';
import { TableCell, TableRow } from 'material-ui/Table';
import RemoveIcon from 'material-ui-icons/RemoveCircle';
import RemoveDialog from './RemoveDialog';
import EditIcon from 'material-ui-icons/Edit';
import ResetIcon from 'material-ui-icons/History';
import ZebeForm from './ZebeForm';
import ResetDialog from './ResetDialog';

export default class ZebeEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRemove: false,
      openEdit: false,
      openReset: false,
    };
    this.openDialog = this.openDialog.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.openReset = this.openReset.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.closeReset = this.closeReset.bind(this);
  }

  openDialog(evt) {
    evt.preventDefault();
    this.setState({openRemove:true})
  }

  openEdit(evt) {
    evt.preventDefault();
    this.setState({openEdit:true})
  }

  openReset(evt) {
    evt.preventDefault();
    this.setState({openReset:true})
  }

  closeReset(evt) {
    evt.preventDefault();
    this.setState({openReset:false});
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
        <TableCell className={this.props.tableCell}>{this.props.entry.kerberos}</TableCell>
        <TableCell>
          <IconButton color="primary" onClick={this.openEdit}>
            <EditIcon/>
          </IconButton>
          <ZebeForm open={this.state.openEdit} cancel={this.closeEdit} initialState={this.props.entry} />
        </TableCell>
        <TableCell>
          <IconButton color="primary" onClick={this.openReset}>
            <ResetIcon/>
          </IconButton>
          <ResetDialog open={this.state.openReset} kerberos={this.props.entry.kerberos}
                       close={this.closeReset}/>
        </TableCell>
        <TableCell>
          <IconButton color="accent" onClick={this.openDialog}>
            <RemoveIcon/>
          </IconButton>
          <RemoveDialog open={this.state.openRemove} kerberos={this.props.entry.kerberos}
                        close={this.closeDialog} />
        </TableCell>
      </TableRow>
    )
  }
}