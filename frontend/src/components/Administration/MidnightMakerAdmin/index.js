/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrent} from '../../../redux/semester/actions';
import {getAll} from '../../../redux/user/actions';
import {getWeekList, getTypeList, getAccountList, getUnreviewed, reviewMidnight, getAll as getAllMidnights} from '../../../redux/midnight/actions';
import {Divider, Typography, Paper, withStyles} from 'material-ui';
import MidnightTypeForm from './MidnightTypeForm';
import MidnightType from './MidnightType';
import AdminTable from '../AdminTable';
import MidnightForm from './MidnightForm';
import MidnightEntry from './MidnightEntry';
import MidnightAccount from './MidnightAccountForm';
import MidnightAccountEntry from './MidnightAccountEntry';
import ReviewDialog from './ReviewDialog'
import AllDialog from "./AllDialog";
import {Loader} from "../../Loader/index";


const style = theme => ({
  paper: {
    marginTop: theme.spacing.unit*3,
    padding: theme.spacing.unit*3,
  },
  title: {
    marginTop: theme.spacing.unit*2,
  },
  gutterDivider: {
    marginTop: theme.spacing.unit*3,
    marginBottom: theme.spacing.unit*3,
  },
});

class Admin extends Component {

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography type="headline" gutterBottom>Midnight Maker Admin Panel</Typography>
        <Divider/>
        <AdminTable contents={this.props.types} headings={["Midnight Task", "Default Value", "Description", "Edit", "Remove"]}
                    componentForEntry={MidnightType} createMessage="Create a new type of midnight"
                    missing="No midnight types exist." form={MidnightTypeForm}/>
        <Divider className={this.props.classes.gutterDivider}/>
        <AdminTable contents={this.props.midnights.reduce((all, next) => (all.concat(next)), [])} createMessage="Assign a new midnight"
                    headings={["Date","Task","Zebe","Note","Points","Edit","Remove"]}
                    missing="There are no midnights for this week." form={MidnightForm}
                    componentForEntry={MidnightEntry}/>
        <Divider className={this.props.classes.gutterDivider}/>
        <AdminTable contents={this.props.accounts} createMessage="Add a Midnight Account"
                    headings={["Zebe","Balance", "Requirement", "Edit","Remove"]}
                    form={MidnightAccount} missing="No accounts are open." extra={this.props.types}
                    componentForEntry={MidnightAccountEntry}/>
        <Divider className={this.props.classes.gutterDivider} />
        <ReviewDialog unreviewed={this.props.unreviewed} types={this.props.types}
                      awardOne={(value)=>this.props.awardOne(this.props.token, value)}
                      refresh={()=>{this.props.getUnreviewed(this.props.token)}}/>
        <AllDialog midnights={this.props.allMidnights} refresh={()=>{this.props.getAll(this.props.token)}}/>
      </Paper>
    )
  }
}

const StyledAdmin = withStyles(style)(Admin);

function mapStateToProps(state) {
  return {
    token: state.session.token,
    midnights: state.midnight.midnights,
    types: state.midnight.types,
    accounts: state.midnight.accounts,
    unreviewed: state.midnight.unreviewed,
    semester: state.semester.semester,
    zebes: state.user.allUsers,
    allMidnights: state.midnight.all,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: getAllMidnights(dispatch),
    getMidnights: getWeekList(dispatch),
    getTypes: getTypeList(dispatch),
    getAccounts: getAccountList(dispatch),
    getUnreviewed: getUnreviewed(dispatch),
    awardOne: reviewMidnight(dispatch),
    getCurrentSemester: getCurrent(dispatch),
    getAllUsers: getAll(dispatch),
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
        props.getAll(props.token),
        props.getTypes(props.token),
        props.getMidnights(props.token),
        props.getAccounts(props.token),
        props.getUnreviewed(props.token),
        props.getCurrentSemester(props.token),
        props.getAllUsers(props.token)
      ])
    })
  }

  render() {
    return (
      <Loader promise={this.state.requests}>
        <StyledAdmin midnights={this.props.midnights}
                     allMidnights={this.props.allMidnights}
                     getUnreviewed={this.props.getUnreviewed}
                     getAll={this.props.getAll}
                     unreviewed={this.props.unreviewed}
                     awardOne={this.props.awardOne}
                     token={this.props.token}
                     types={this.props.types}
                     accounts={this.props.accounts}
        />
      </Loader>
    )
  }
}


let Connected = connect(mapStateToProps, mapDispatchToProps)(MidnightWrapper);

export {Connected as MidnightMaker}