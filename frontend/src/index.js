import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import { MuiThemeProvider,  } from 'material-ui/styles';
import theme from './theme'
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
