/**
 * Created by nwu on 10/4/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWeekList, getAccountList, getTypeList} from '../../redux/midnight/actions';
import {getCurrent} from '../../redux/user/actions';
import {postMidnightTrade} from '../../redux/trades/actions';
import {Loader} from '../Loader';
import {Paper, Divider, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, withStyles} from 'material-ui';
import MidnightEntry from './MidnightEntry';

const daysOfTheWeek=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
    marginBottom: theme.spacing.unit*3,
  },
  calendar: {
    marginTop: theme.spacing.unit*3,
  },
  divider: {
    marginBottom: theme.spacing.unit*3,
  },
  cell: {
    verticalAlign: "middle",
  }
});


class Midnights extends Component {

  render() {
    return (
      <div>
        <Paper className={this.props.classes.paper} elevation={4}>
          <Typography type="headline" gutterBottom>Midnights</Typography>
          <Divider/>
          <Grid container spacing={8} className={this.props.classes.calendar} justify="center" align="stretch">
            { daysOfTheWeek.map((day, index) => {
              return (
                <Grid sm={12} md={true} item key={index}>
                  <Typography type="title" gutterBottom align="center">{day}</Typography>
                  <Divider className={this.props.classes.divider}/>
                  <Grid container direction="column">
                    { this.props.midnightList[index].length ? this.props.midnightList[index]
                      .sort((a, b) => {
                        if (a.task < b.task) {
                          return -1;
                        } else if (a.task > b.task) {
                          return 1;
                        } else {
                          return 0;
                        }
                      })
                      .map((midnight, idx) => {
                        return (
                          <MidnightEntry key={idx} midnight={midnight} types={this.props.types}
                                         post={(data) => (this.props.postTrade(this.props.token, data))}
                                         yours={this.props.user.kerberos === midnight.zebe}/>
                        )
                      }) :
                      <Grid item>
                        <Typography type="caption"> No midnights have been assigned for this day. </Typography>
                      </Grid>
                    }
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Paper>
        <Paper className={this.props.classes.paper} elevation={4}>
          <Typography type="headline" gutterBottom>Points</Typography>
          <Divider/>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={this.props.classes.cell}>Zebe</TableCell>
                <TableCell className={this.props.classes.cell}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.accounts.sort((a, b) => (b.balance - a.balance)).map((a, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell className={this.props.classes.cell}>{a.zebe}</TableCell>
                    <TableCell className={this.props.classes.cell}>{a.balance}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const StyledMidnights = withStyles(style)(Midnights);

function mapStateToProps(state) {
  return {
    token: state.session.token,
    user: state.user.user,
    midnightList: state.midnight.midnights,
    accounts: state.midnight.accounts,
    types: state.midnight.types,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrent: getCurrent(dispatch),
    getMidnights: getWeekList(dispatch),
    getAccounts: getAccountList(dispatch),
    getTypes: getTypeList(dispatch),
    postTrade: postMidnightTrade(dispatch),
  }
}

class MidnightWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
    }
  }

  componentWillMount() {
    let props = this.props;
    this.setState({
      requests: Promise.all([
        props.getCurrent(props.token),
        props.getMidnights(props.token),
        props.getAccounts(props.token),
        props.getTypes(props.token)
      ])
    })
  }

  render() {
    return (
      <Loader promise={this.state.requests}>
        <StyledMidnights user={this.props.user}
                    accounts={this.props.accounts}
                    midnightList={this.props.midnightList}
                    types={this.props.types}
        />
      </Loader>
    )
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(MidnightWrapper);

export default Connected