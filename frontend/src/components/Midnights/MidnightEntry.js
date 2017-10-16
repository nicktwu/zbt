/**
 * Created by nwu on 10/15/17.
 */
import React, {Component} from 'react';
import {Grid, Typography, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableRow, TableCell,
  withStyles
} from 'material-ui';

const style = theme => ({
  button: {
    width: "100%",
  },
  highlightButton: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
  highlight: {
    color: theme.palette.secondary.A400,
  },
  text: {
    textTransform: "none",
    color: "inherit",
  }
});

class MidnightEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    this.setState({open: true})
  }

  close() {
    this.setState({open: false})
  }

  render() {
    let midnight = this.props.midnight;
    return (
      <Grid item className={this.props.classes.container}>
        <Button raised color={this.props.yours ? "accent" : null}
                className={this.props.classes.button} onClick={this.open}>
          <Typography type="body1" align="center" className={this.props.classes.text}>
            {midnight.task}: {midnight.zebe}
          </Typography>
        </Button>
        <Dialog open={this.state.open}>
          <DialogTitle>
            {midnight.task + ": " + midnight.zebe}
          </DialogTitle>
          <DialogContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><Typography type="subheading">Possible points:</Typography></TableCell>
                  <TableCell><Typography type="body1">{midnight.potential}</Typography></TableCell>
                </TableRow>
                { midnight.note ?
                  <TableRow>
                    <TableCell><Typography type="title">Special note:</Typography></TableCell>
                    <TableCell><Typography type="body1">{midnight.note}</Typography></TableCell>
                  </TableRow>: null}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  }
}

export default withStyles(style)(MidnightEntry);
