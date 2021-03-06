import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import { deepOrange, red, blue, lime } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily: "\"Nunito\", sans-serif",
  },
  palette: {
    primary: {
      main: lime[400]
    },
    secondary: {
      main: red[900]
    }
  },
  status: {
    danger: deepOrange[500]
  },
  switch: {
    root: {
      width: {
        small: 50,
        medium: 50
      },
      height: {
        small: 20,
        medium: 50
      },
    },
    thumb: {
      width: {
        small: 23,
        medium: 23
      },
      height: {
        small: 12,
        medium: 23
      }
    },
    track: {
      borderRadius: {
        small: 23 / 2,
        medium: 26 /2
      },
      height: {
        small: '23px',
        medium: '26px'
      },
      width: {
        small: '38px',
        medium: '45px'
      }
    },
    switchBase: {
      transform: {
        small: '14px'
      }
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        color: '#ddd'
        // color: '#666'
      }
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
