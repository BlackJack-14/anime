import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {console.log = console.warn = console.error = () => { }}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
