/**
 * Created by nwu on 9/26/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    ready: state.ready,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

class Loader extends Component {

  render() {
    if (this.props.ready.ready) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }
  }
}

let connected = connect(mapStateToProps, mapDispatchToProps)(Loader);

export {connected as Loader};