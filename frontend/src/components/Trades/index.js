/**
 * Created by nwu on 10/1/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../redux/user/actions';
import {getAllMidnightTrades} from '../../redux/trades/actions';
import {Paper, Divider,
  Table, TableHead, TableBody, TableRow, TableCell,
  Grid, Typography, withStyles} from 'material-ui';

function mapStateToProps(state) {
  return {
    token: state.session.token,
    user: state.user.user,
    midnightTrades: state.trades.midnight,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: getCurrent(dispatch),
    getAllMidnight: getAllMidnightTrades(dispatch)
  }
}

const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
    marginBottom: theme.spacing.unit*3
  },
  divider: {
    marginBottom: theme.spacing.unit*3
  },
  tableCell: {
    verticalAlign: "middle",
  },
  tableText: {
    paddingTop: theme.spacing.unit,
  }
});


class Trades extends Component {

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getCurrentUser && props.getAllMidnight) {
      props.getCurrentUser(props.token);
      props.getAllMidnight(props.token);
    }
  }

  render() {
    if (this.props.user) {
      return (
        <div>
          <Paper className={this.props.classes.paper}>
            <Typography type="headline" gutterBottom>Current Trades</Typography>
            <Divider className={this.props.classes.divider}/>
            <Grid container justify="center">
              <Grid item>
                { this.props.midnightTrades && this.props.midnightTrades.length ?
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={this.props.classes.tableCell}>Date:</TableCell>
                        <TableCell className={this.props.classes.tableCell}>Task:</TableCell>
                        <TableCell className={this.props.classes.tableCell}>Additional Points:</TableCell>
                        <TableCell className={this.props.classes.tableCell}>Action:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { this.props.midnightTrades.map((trade, idx)=>{
                        console.log(trade);
                        return (
                          <TableRow key={idx}>
                            <TableCell className={this.props.classes.tableCell}>Date</TableCell>
                            <TableCell className={this.props.classes.tableCell}>Task</TableCell>
                            <TableCell className={this.props.classes.tableCell}>{trade.offered}</TableCell>

                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  :
                    <Typography type="caption">There are currently no midnights up for trade.</Typography>
                  }
              </Grid>

            </Grid>
          </Paper>
          <Paper className={this.props.classes.paper}>
            <Typography type="headline" gutterBottom>Recent Trades</Typography>
            <Divider/>
          </Paper>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
}

let ConnectedTrades = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Trades));

export {ConnectedTrades as Trades}