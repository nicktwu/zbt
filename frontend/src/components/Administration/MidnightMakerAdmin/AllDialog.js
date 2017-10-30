/**
 * Created by nwu on 10/29/17.
 */
import React, {Component} from 'react';
import {Button, withStyles} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import MidnightEntry from "./MidnightEntry";
import MidnightForm from "./MidnightForm";
import AdminTable from "../AdminTable";


const style = theme => ({
  buttonContainer : {
    marginTop: theme.spacing.unit*3,
    textAlign: "center",
  },
});

class AllDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    this.props.refresh();
    this.setState({open: true});
  }

  close(evt) {
    this.setState({open: false})
  }

  render () {
    return (
      <div>
        <div className={this.props.classes.buttonContainer}>
          <Button raised color="primary" onClick={this.open}>See All Midnights</Button>
        </div>
        <Dialog open={this.state.open} onRequestClose={this.close}>
          <DialogTitle>{"All Midnights"}</DialogTitle>
          <DialogContent>
            <AdminTable contents={this.props.midnights} createMessage="Assign a new midnight"
                        headings={["Date","Task","Zebe","Note","Points","Edit","Remove"]}
                        missing="There are no midnights for this week." form={MidnightForm}
                        componentForEntry={MidnightEntry}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(style)(AllDialog);