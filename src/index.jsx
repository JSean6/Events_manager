import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FetchedEvents from './components/FetchedEvents';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <FetchedEvents />
  </React.StrictMode>,
  document.getElementById('root')
);
