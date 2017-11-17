/**
 * Created by nwu on 10/15/17.
 */
import React, {Component} from 'react';
import {Grid, Typography, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  Table, TableBody, TableRow, TableCell, TextField,
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
  },
});

const style2 = theme => ({
  content: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  },
  tableCell: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

class KeyValue extends Component {
  render() {
    return (
      <TableRow>
        <TableCell className={this.props.classes.tableCell}><Typography type="subheading">{this.props.label}</Typography></TableCell>
        <TableCell className={this.props.classes.content}><Typography type="body1">{this.props.value}</Typography></TableCell>
      </TableRow>
    )
  }
}

let StyledKeyValue = withStyles(style2)(KeyValue);


class MidnightEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tradeOpen: false,
      tradeIncentive: 0,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.trade = this.trade.bind(this);
    this.startTrade = this.startTrade.bind(this);
    this.cancelTrade = this.cancelTrade.bind(this);
  }

  open() {
    this.setState({open: true})
  }

  close() {
    this.setState({open: false})
  }

  trade() {
    this.props.post({
      midnight: this.props.midnight._id,
      zebe_offering: this.props.midnight.zebe,
      offered: this.state.tradeIncentive,
    }).then(()=>{
      this.setState({tradeOpen: false, open: false})
    })
  }

  startTrade() {
    this.setState({tradeOpen: true});
  }

  cancelTrade() {
    this.setState({tradeOpen: false});
  }

  render() {
    let midnight = this.props.midnight;
    let description = this.props.types.filter((t) => (t.name === midnight.task)).reduce((s, v) => v.description, "");
    let possible = this.props.types.filter((t) => (t.name === midnight.task)).reduce((s,v) => v.value, 0);
    let midnightDate = new Date(midnight.date);
    let past = (new Date(midnightDate.getFullYear(), midnightDate.getMonth(), midnightDate.getDay()+1)) <= new Date();


    return (
      <Grid item className={this.props.classes.container}>
        <Button dense raised color={midnight.reviewed ? "primary" : (this.props.yours ? "accent" : null)}
                className={this.props.classes.button} onClick={this.open}>
          <Typography type="body1" align="center" className={this.props.classes.text}>
            {midnight.task}: {midnight.zebe}
          </Typography>
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.close}>
          <DialogTitle>
            {midnight.task + ": " + midnight.zebe}
          </DialogTitle>
          <DialogContent>
            <Table className={this.props.classes.table}>
              <TableBody>
                <StyledKeyValue label="Possible points:" value={midnight.potential ? midnight.potential : possible}/>
                { midnight.note ?
                  <StyledKeyValue label="Special note:" value={midnight.note}/> : null }
                { description ?
                  <StyledKeyValue label="Description:" value={description}/> : null}
                { midnight.reviewed ?
                  <StyledKeyValue label="Points awarded:" value={midnight.awarded}/> : null
                }
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            {this.props.yours && !past && !midnight.offered ?
              <Button color="accent" onClick={this.startTrade}>
                Trade
              </Button>
              : null}
            <Button onClick={this.close}>
              Close
            </Button>
          </DialogActions>
          <Dialog open={this.state.tradeOpen}>
            <DialogTitle>{'Give Away Midnight'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter some value if you want to incentivize taking with your own points (otherwise, leave it as 0).
              </DialogContentText>
              <TextField type="number" value={this.state.tradeIncentive} margin="normal" fullWidth
                         label="Trade Incentive" onChange={(evt)=>{this.setState({ tradeIncentive: evt.target.value })}}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.cancelTrade}>
                Cancel
              </Button>
              <Button color="primary" onClick={this.trade}>
                Finalize Offer
              </Button>
            </DialogActions>
          </Dialog>
        </Dialog>
      </Grid>
    )
  }
}

export default withStyles(style)(MidnightEntry);
