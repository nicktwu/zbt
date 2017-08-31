import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class MidnightTradingPanel extends Component {
  componentDidMount() {
    this.props.fetchTrades();
  }

  render() {

    return (
      <div className="MidnightTradingPanel">
        <div className="MidnightView-title">Trade</div>
        <div className="MidnightTradingPanel-container">
          <div className="MidnightTradingPanel-menu">
            <div className="MidnightTradingPanel-menu-btn">Trade with others</div>
            <div className="MidnightTradingPanel-menu-btn">Incoming trade offers</div>
          </div>
        {/* map data into following wrapper */}
          Buttons:
          <div className="MidnightTradingPanel-trade">midnight blah - trade with this midnight</div>
          <div className="MidnightTradingPanel-btn">Open midnight to solicit trade offers</div>
          <div className="MidnightTradingPanel-btn">Free midnight -- I can't do it, someone take pls [disclaimer: if no one takes it, you're fucked]</div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, {type}) => ({ ...state[type], user: state.user });
const mapDispatchToProps = (dispatch, {midnight_id}) => ({
  fetchTrades() {
    dispatch({
      types: ['LOAD_EVENT_START', 'LOAD_EVENT_SUCCESS', 'LOAD_EVENT_FAIL'],
      //route: '/midnights/' + midnight_id,
      //shouldCallAPI: //
    });
  },
});

const MidnightTradingPanelWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidnightTradingPanel);

export default withRouter(MidnightTradingPanelWithData);