import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class MidnightTradingPanel extends Component {
  constructor() {
    super();
    this.state = {
      menuTab: 'offering' // or 'accepting' trades
    };
    this.menuButtonListener = this.menuButtonListener.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrades(this.state.menuTab);
  }

  menuButtonListener(menuOption) {
    this.setState({ menuTab: menuOption });
  }

  render() {

    return (
      <div className="MidnightTradingPanel">
        <div className="MidnightView-title"><h1>Trade</h1></div>
        <div className="MidnightTradingPanel-container">
          <div className="MidnightTradingPanel-menu">
            <div className={classnames('MidnightTradingPanel-menu-btn', this.state.menuTab === 'offering' ? 'active' : '')} onClick={this.menuButtonListener('offering')}>Trade with others</div>
            <div className={classnames('MidnightTradingPanel-menu-btn', this.state.menuTab === 'accepting' ? 'active' : '')} onClick={this.menuButtonListener('accepting')}>Incoming trade offers</div>
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