/**
 * Created by nwu on 10/3/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWeekList, getTypeList} from '../../../redux/midnight/actions';
import {Divider, Typography, Paper, withStyles} from 'material-ui';
import MidnightTypeForm from './MidnightTypeForm';
import MidnightType from './MidnightType';
import AdminTable from '../AdminTable';
import MidnightForm from './MidnightForm';
import MidnightEntry from './MidnightEntry';

function mapStateToProps(state) {
  return {
    token: state.session.token,
    midnights: state.midnight.midnights,
    types: state.midnight.types
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMidnights: getWeekList(dispatch),
    getTypes: getTypeList(dispatch)
  }
}

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
  }
});

class Admin extends Component {

  componentWillMount() {
    let props = this.props;
    if (props.token && props.getTypes) {
      props.getTypes(props.token);
      props.getMidnights(props.token);
    }
  }
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
      </Paper>
    )
  }
}

let Connected = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));

export {Connected as MidnightMaker}