/**
 * Created by nwu on 10/4/17.
 */
import React, {Component} from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import {withStyles, Grid, Button, TextField} from 'material-ui';
import {createType, editType} from '../../../redux/midnight/actions';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return ({
    token: state.session.token,
  })
}

function mapDispatchToProps(dispatch) {
  return {
    createType: createType(dispatch),
    editType: editType(dispatch),
  }
}

const style = theme => ({
  dialogContent: {
    boxSizing: "border-box",
  }
});

const initialState = {
  name: "",
  value: 0,
  description: ""
};

class MidnightTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialState ? props.initialState : initialState;

    this.submit = this.submit.bind(this);
    this.changeState = this.changeState.bind(this);
    this.checkBox = this.checkBox.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialState) {
      this.setState(nextProps.initialState);
    } else {
      this.setState(initialState);
    }
  }

  submit(evt) {
    // TODO: Some sort of form validation should happen here
    if (!this.props.initialState) {
      this.props.createType(this.props.token, this.state);
    } else {
      this.props.editType(this.props.token, this.state);
    }
    this.props.cancel(evt);
  }

  changeState(field) {
    return (evt) => {
      let newState = {};
      newState[field] = evt.target.value;
      this.setState(newState);
    }
  }

  checkBox(name) {
    return (evt, checked) => {
      this.setState({[name]: checked});
    }
  }


  render() {
    console.log(this.state);
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.cancel}>
        <DialogTitle>{this.props.initialState ? "Edit Midnight Default" : 'Add a new type of midnight'}</DialogTitle>
        <DialogContent className={this.props.classes.dialogContent}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField className={this.props.classes.textField} margin="normal" fullWidth
                         label="Task Name" value={this.state.name}
                         onChange={this.changeState("name")}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className={this.props.classes.textField} type="number" fullWidth
                         label="Point value" value={this.state.value} margin="normal"
                         onChange={this.changeState("value")}/>
            </Grid>
            <Grid item xs={12}>
              <TextField className={this.props.classes.textField} multiline margin="normal"
                         label="Description" value={this.state.description} fullWidth
                         onChange={this.changeState("description")}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary">
            { this.props.initialState ? "Save" : "Create" }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MidnightTypeForm))