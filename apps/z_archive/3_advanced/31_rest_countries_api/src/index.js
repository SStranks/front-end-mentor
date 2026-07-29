import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import './styles/styles.scss';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);
