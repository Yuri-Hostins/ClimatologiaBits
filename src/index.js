import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base/reset.css';
import './styles/base/base.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);