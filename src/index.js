import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/main.css';
import App from './components/App';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-161829852-2');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
