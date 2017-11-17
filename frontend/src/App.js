import React, { Component } from 'react';
import "./App.css";
import SessionRouter from './router/session';

class App extends Component {
  render() {
    return (
        <div className="background">
          <SessionRouter>
          </SessionRouter>
        </div>
    );
  }
}

export default App;
