import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class MidnightTradingPanel extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchTrades(this.state.menuTab);
  }

  render() {
    const { events, user, type } = this.props;


    return (
      <div className="MidnightTradingPanel">
        <div className="MidnightView-title"><h1>Trade</h1></div>
        <div className="MidnightTradingPanel-container">
          <button className="MidnightTradingPanel-btn">midnight blah - trade with this midnight</button>
          <button className="MidnightTradingPanel-btn">Free midnight -- I can't do it, someone take pls [disclaimer: if no one takes it, you're fucked]</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, {type}) => ({ ...state[type], user: state.user });
const mapDispatchToProps = (dispatch, {type}) => ({
  fetchTrades(tradeDirection) {
    if (tradeDirection === 'offering') {
      dispatch({
        types: ['POST_FREE_START', 'POST_FREE_SUCCESS', 'POST_FREE_FAIL'],
        route: '/trades/midnight',
        method: 'POST',
        body: {
          midnight_id: ,
          zebe_offering: ,
          offered: 
        }
      });
    }
    else {
      dispatch({
        types: ['POST_TRADES_START', 'POST_TRADES_SUCCESS', 'POST_TRADES_FAIL'],
        route: '/trades/midnight/execute/' + TRADE_ID,
        method: 'PUT'
      });
    }
  },
});

const MidnightTradingPanelWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidnightTradingPanel);


export default MidnightTradingPanelWithData;