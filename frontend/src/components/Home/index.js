/**
 * Created by nwu on 9/27/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../redux/user/actions';
import {getWeekList, getAccountList, getReviewed} from '../../redux/midnight/actions';
import {Loader} from '../Loader';
import {Paper, Divider, Typography, withStyles} from 'material-ui';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List';
import ListArrow from 'material-ui-icons/TrendingFlat';
import ThumbUp from 'material-ui-icons/ThumbUp';

const daysOfTheWeek=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDayWord = (day, today) => {
  if (day === today) {
    return " tonight";
  } else {
    return " on " + daysOfTheWeek[day];
  }
}


const style = theme => ({
  paper: {
    padding: theme.spacing.unit*3,
  },
  divider: {
    marginTop: theme.spacing.unit*3,
    marginBottom: theme.spacing.unit*3,
  }
});


class Home extends Component {

  render() {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()-6);
    let userMidnightAccount = this.props.midnightAccounts.filter((a) => a.zebe === this.props.user.kerberos).sort((a, b) => {
      return (Date.parse(a.date) - Date.parse(b.date))
    });
    let userMidnights = this.props.midnightList.reduce((all, next) => (all.concat(next)), []).filter((a) => a.zebe === this.props.user.kerberos).sort((a, b) => {
      return (Date.parse(a.date) - Date.parse(b.date))
    });
    let remainingMidnights = userMidnights.filter(a => {
      let midnightDate = new Date(a.date);
      let midnightDay = (midnightDate).getDay() + 1;
      return midnightDay >= today.getDay()
    });
    let userMidnightReviewed = this.props.midnightReviewed.filter((a) => a.zebe === this.prop.user.kerberos).sort((a, b) => {
      return (Date.parse(a.date) - Date.parse(b.date))
    });
    return (
      <Paper className={this.props.classes.paper}>
        <Typography type="headline" gutterBottom>Hello, {this.props.user.name}
          ({this.props.user.kerberos})!</Typography>
        <Typography type="caption" gutterBottom>
          {this.props.user.current ? "Current Zebe" : ""}{this.props.user.president ? ", President" : ""}{this.props.user.rush_chair ? ", Rush Chair" : ""}{this.props.user.midnight_maker ? ", Midnight Maker" : ""}{this.props.user.house_chair ? ", House Chair" : ""}{this.props.user.social_chair ? ", Social Chair" : ""}{this.props.user.workweek_chair ? ", Workweek Chair" : ""}{this.props.user.tech_chair ? ", Tech Chair" : ""}{this.props.user.dev ? ", Developer" : ""}
        </Typography>
        <Divider className={this.props.classes.divider}/>
        <Typography type="title" gutterBottom>Midnights</Typography>
        { userMidnightAccount.length ?
          <div>
            <Typography type="body2">You have {userMidnightAccount[0].balance} midnight points.</Typography>
            { userMidnights.length ?
              <List dense>
                {remainingMidnights.length ?
                  remainingMidnights.map((midnight, idx) => {
                    return (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <ListArrow/>
                        </ListItemIcon>
                        <ListItemText
                          primary={"You have " + midnight.task + getDayWord(((new Date(midnight.date)).getDay() + 1) % 7, today.getDay()) + "."}/>
                      </ListItem>
                    )
                  }) :
                  <ListItem>
                    <ListItemIcon>
                      <ThumbUp/>
                    </ListItemIcon>
                    <ListItemText primary="You have no midnights left this week!"/>
                  </ListItem>
                }
              </List> : null
            }
            { userMidnightReviewed.length ?
              <List dense>
                {userMidnightReviewed.map((m, idx) => {
                  return (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={"You were awarded " + m.awarded + " points for " + m.task + " on " + m.date}/>
                    </ListItem>
                  )
                })}
              </List>
              : <Typography type="body2">No recently reviewed midnights to report.</Typography>}
          </div> :
          <Typography type="body2">You do not have any midnights</Typography>
        }
      </Paper>
    )
  }
}

const StyledHome = withStyles(style)(Home);



function mapStateToProps(state) {
  return {
    token: state.session.token,
    user: state.user.user,
    midnightAccounts: state.midnight.accounts,
    midnightReviewed: state.midnight.reviewed,
    midnightList: state.midnight.midnights
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: getCurrent(dispatch),
    getMidnightList: getWeekList(dispatch),
    getMidnightAccounts: getAccountList(dispatch),
    getMidnightReviewed: getReviewed(dispatch),
  }
}

class HomeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
    }
  }

  componentWillMount() {
    let props = this.props;
    this.setState({requests: Promise.all([
      props.getCurrentUser(props.token),
      props.getMidnightAccounts(props.token),
      props.getMidnightList(props.token),
      props.getMidnightReviewed(props.token)
    ])})
  }

  render() {
    return (
      <Loader promise={this.state.requests}>
        <StyledHome user={this.props.user}
                    midnightAccounts={this.props.midnightAccounts}
                    midnightList={this.props.midnightList}
                    midnightReviewed={this.props.midnightReviewed}
        />
      </Loader>
    )
  }
}


let ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);

export {ConnectedHome as Home}