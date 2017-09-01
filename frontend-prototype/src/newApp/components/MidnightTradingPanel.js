import React, { Component } from 'react';
import { connect } from 'react-redux';

class MidnightTradingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      midnight: props.midnight
    };
  }

  render() {
    const { events, user, type } = this.props;

    return (
      <div className="MidnightTradingPanel">
        <div className="MidnightView-title"><h1>Trade</h1></div>
        <div className="MidnightTradeInstructions">
          Midnight trade instructions
        </div>
        <div className="MidnightTradingPanel-container">
          <button className="MidnightTradingPanel-btn" onClick={() => this.props.takeTrade(this.state)}>Claim</button>
          {this.state.midnight.zebe === this.state.user.kerberos ? <button className="MidnightTradingPanel-btn" onClick={() => this.props.offerTrade(this.state)}>Post for Claiming</button> : ''}
          <button className="MidnightTradingPanel-btn" onClick={() => this.props.offerTrade(this.state)}>Post for Claiming</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({ ...state['midnights'], user: state.user });
const mapDispatchToProps = (dispatch) => ({
  offerTrade(state) {
    dispatch({
      types: ['POST_OFFER_START', 'POST_OFFER_SUCCESS', 'POST_OFFER_FAIL'],
      route: '/trades/midnight',
      method: 'POST',
      params: {
        midnight_id: state.midnight._id,
        zebe_offering: state.midnight.zebe, //state.user.kerberos,
        offered: 0
      }
    });
  },
  takeTrade(state) {
    dispatch({
      types: ['PUT_TRADE_START', 'POST_TRADE_SUCCESS', 'POST_TRADE_FAIL'],
      route: '/trades/midnight/execute/' + state.midnight._id,
      method: 'PUT'
    });
  }
});

const MidnightTradingPanelWithData = connect(
  mapStateToProps,
  mapDispatchToProps
)(MidnightTradingPanel);


export default MidnightTradingPanelWithData;