import React, { Component } from 'react';
import "./App.css";
import {Loader} from './components/Loader';
import SessionRouter from './router/session';

class App extends Component {
  render() {
    return (
        <div className="background">
          <Loader>
            <SessionRouter>
            </SessionRouter>
          </Loader>
        </div>
    );
  }
}

export default App;
