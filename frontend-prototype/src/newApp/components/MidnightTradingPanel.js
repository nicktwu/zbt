import React, { Component } from 'react';
import { connect } from 'react-redux';

class MidnightTradingPanel extends Component {

  render() {
    const { events, user, type } = this.props;


    return (
      <div className="MidnightTradingPanel">
        <div className="MidnightView-title"><h1>Trade</h1></div>
        <div className="MidnightTradeInstructions">
          Midnight trade instructions
        </div>
        <div className="MidnightTradingPanel-container">
          <button className="MidnightTradingPanel-btn" onClick={this.props.takeTrade}>Claim</button>
          <button className="MidnightTradingPanel-btn" onClick={this.props.offerTrade}>Post for Claiming</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, {type}) => ({ ...state[type], user: state.user });
const mapDispatchToProps = (dispatch, {type}) => ({
  offerTrade() {
    dispatch({
      types: ['POST_OFFER_START', 'POST_OFFER_SUCCESS', 'POST_OFFER_FAIL'],
      route: '/trades/midnight',
      method: 'POST',
      body: {
        midnight_id: '',
        zebe_offering: '',
        offered: ''
      }
    });
  },
  takeTrade() {
    dispatch({
      types: ['PUT_TRADE_START', 'POST_TRADE_SUCCESS', 'POST_TRADE_FAIL'],
      route: '/trades/midnight/execute/' + '',
      method: 'PUT'
    });
  }
});

const MidnightTradingPanelWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidnightTradingPanel);


export default MidnightTradingPanelWithData;