/**
 * Created by nwu on 10/29/17.
 */
import React, {Component} from 'react';
import {IconButton} from 'material-ui';
import { TableCell, TableRow } from 'material-ui/Table';
import RemoveIcon from 'material-ui-icons/RemoveCircle';
import EditIcon from 'material-ui-icons/Edit';
import MidnightForm from './AllMidnightForm';
import RemoveMidnightDialog from './AllRemoveDialog';

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
    let entry = this.props.entry;
    if (this.props.entry.potential) {
      // do nothing
    } else if (this.props.extra) {
      entry.potential = this.props.types.filter((t) => (t.name === entry.task)).reduce((s,v) => v.value, 0);
    }

    return (
      <TableRow key={this.props.index} className={this.props.tableRow}>
        <TableCell className={this.props.tableCell}>{this.props.entry.date.substring(0, 10)}</TableCell>
        <TableCell className={this.props.tableCell}>{this.props.entry.task}</TableCell>
        <TableCell className={this.props.tableCell}>{this.props.entry.zebe}</TableCell>
        <TableCell className={this.props.tableCell}>{this.props.entry.note}</TableCell>
        <TableCell className={this.props.tableCell}>{entry.potential}</TableCell>
        <TableCell>
          <IconButton color="primary" onClick={this.openEdit}>
            <EditIcon/>
          </IconButton>
          <MidnightForm open={this.state.openEdit} cancel={this.closeEdit} initialState={entry} />
        </TableCell>
        <TableCell>
          <IconButton color="accent" onClick={this.openDialog}>
            <RemoveIcon/>
          </IconButton>
          <RemoveMidnightDialog open={this.state.openRemove} name={"this midnight"}
                                id={this.props.entry._id} close={this.closeDialog}/>
        </TableCell>
      </TableRow>
    )
  }
}